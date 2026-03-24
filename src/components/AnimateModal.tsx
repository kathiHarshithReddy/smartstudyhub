import React, { useState, useEffect, useRef } from 'react';
import { Subject } from '../data/curriculum';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize, Settings, Film, Edit3, CheckCircle2, Sparkles } from 'lucide-react';
import { generateSlideStoryboard } from '../services/gemini';
import { cn } from '../lib/utils';

interface AnimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: Subject;
  topic: string;
}

interface SlideData {
  slideNumber: number;
  type: string;
  title: string;
  content: string | string[];
  narration: string;
}

export function AnimateModal({ isOpen, onClose, subject, topic }: AnimateModalProps) {
  const [phase, setPhase] = useState<'loading' | 'script' | 'rendering' | 'playing'>('loading');
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [error, setError] = useState('');
  
  // Player state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // Timer for auto-advance
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      startScriptGeneration();
    } else {
      // Reset state on close
      setPhase('loading');
      setSlides([]);
      setError('');
      setCurrentSlide(0);
      setIsPlaying(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [isOpen, topic]);

  const startScriptGeneration = async () => {
    setPhase('loading');
    setError('');
    
    try {
      const storyboard = await generateSlideStoryboard(subject.name, topic);
      setSlides(storyboard);
      setPhase('script');
    } catch (err: any) {
      setError(err.message || 'Failed to generate storyboard. Please check your API key.');
      setPhase('script'); // Still go to script phase to show error
    }
  };

  const handleNarrationChange = (index: number, newText: string) => {
    const newSlides = [...slides];
    newSlides[index].narration = newText;
    setSlides(newSlides);
  };

  const startRendering = () => {
    setPhase('rendering');
    // Simulate rendering time
    setTimeout(() => {
      setPhase('playing');
      setIsPlaying(true);
    }, 2000);
  };

  // Player logic
  useEffect(() => {
    if (phase === 'playing' && isPlaying) {
      // Auto advance slides based on narration length (rough estimate: 150 words per minute)
      const currentNarration = slides[currentSlide]?.narration || '';
      const wordCount = currentNarration.split(' ').length;
      const durationMs = Math.max((wordCount / 150) * 60000 * (1 / speed), 3000); // Min 3 seconds

      timerRef.current = setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          setIsPlaying(false); // End of presentation
        }
      }, durationMs);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, isPlaying, currentSlide, speed, slides]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
            <div className="flex items-center">
              <Film className="w-5 h-5 mr-3 text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-100">
                AI Video Generator
              </h2>
              <span className="mx-3 text-slate-600">|</span>
              <span className="text-slate-400 text-sm truncate max-w-[200px] sm:max-w-md">
                {topic}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden relative bg-slate-950">
            
            {/* Phase: Loading */}
            {phase === 'loading' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-bold text-white mb-2">Writing Storyboard...</h3>
                <p className="text-slate-400 max-w-md">
                  Gemini is analyzing the topic and structuring a 7-slide animated presentation.
                </p>
              </div>
            )}

            {/* Phase: Script Review */}
            {phase === 'script' && (
              <div className="absolute inset-0 flex flex-col h-full">
                <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Edit3 className="w-5 h-5 mr-2 text-amber-400" />
                      Review Script
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      Edit the narration for each slide before generating the video.
                    </p>
                  </div>
                  <button
                    onClick={startRendering}
                    disabled={slides.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(79,70,229,0.4)] disabled:opacity-50 flex items-center"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Generate Video
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  {error ? (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
                      {error}
                    </div>
                  ) : (
                    slides.map((slide, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-sm mr-3">
                              {slide.slideNumber}
                            </span>
                            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-md border border-slate-700 mr-3">
                              {slide.type}
                            </span>
                            <h4 className="font-bold text-slate-200">{slide.title}</h4>
                          </div>
                          <span className="text-xs text-slate-500">{slide.narration.split(' ').length} words</span>
                        </div>
                        <div className="pl-11">
                          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Narration</label>
                          <textarea
                            value={slide.narration}
                            onChange={(e) => handleNarrationChange(idx, e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 min-h-[80px] resize-y"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Phase: Rendering */}
            {phase === 'rendering' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Rendering Animation...</h3>
                <p className="text-slate-400 max-w-md">
                  Composing slides, applying transitions, and syncing narration.
                </p>
              </div>
            )}

            {/* Phase: Playing */}
            {phase === 'playing' && slides.length > 0 && (
              <div className="absolute inset-0 flex flex-col" ref={playerRef}>
                {/* Slide Stage */}
                <div className="flex-1 relative bg-slate-950 overflow-hidden flex items-center justify-center p-8">
                  <AnimatePresence mode="wait">
                    <SlideRenderer key={currentSlide} slide={slides[currentSlide]} />
                  </AnimatePresence>
                  
                  {/* Narration Subtitles */}
                  <div className="absolute bottom-8 left-0 right-0 flex justify-center px-8 z-20 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-xl max-w-3xl text-center text-lg shadow-2xl border border-white/10">
                      {slides[currentSlide].narration}
                    </div>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="h-16 bg-slate-900 border-t border-slate-800 flex items-center px-4 gap-4 select-none">
                  {/* Play/Pause */}
                  <button onClick={togglePlay} className="p-2 text-white hover:text-indigo-400 transition-colors">
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                  </button>
                  
                  {/* Skip */}
                  <div className="flex items-center gap-1">
                    <button onClick={prevSlide} disabled={currentSlide === 0} className="p-2 text-slate-400 hover:text-white disabled:opacity-30 transition-colors">
                      <SkipBack className="w-5 h-5 fill-current" />
                    </button>
                    <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-2 text-slate-400 hover:text-white disabled:opacity-30 transition-colors">
                      <SkipForward className="w-5 h-5 fill-current" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono w-8 text-right">{currentSlide + 1}</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full relative cursor-pointer group flex items-center">
                      {/* Track segments */}
                      <div className="absolute inset-0 flex">
                        {slides.map((_, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => {
                              setCurrentSlide(idx);
                              if (timerRef.current) clearTimeout(timerRef.current);
                            }}
                            className="h-full flex-1 border-r border-slate-900 last:border-0 relative"
                          >
                            {/* Fill */}
                            <div className={cn(
                              "absolute inset-0 bg-indigo-500 transition-all duration-300",
                              idx < currentSlide ? "opacity-100" : idx === currentSlide ? "opacity-50" : "opacity-0"
                            )} />
                            {/* Hover pip */}
                            <div className="absolute inset-0 hover:bg-white/20 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono w-8">{slides.length}</span>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-slate-400 hover:text-white transition-colors">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    
                    <select 
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="bg-transparent text-slate-300 text-sm font-medium focus:outline-none cursor-pointer appearance-none px-2"
                    >
                      <option value={0.5} className="bg-slate-800">0.5x</option>
                      <option value={1} className="bg-slate-800">1x</option>
                      <option value={1.5} className="bg-slate-800">1.5x</option>
                      <option value={2} className="bg-slate-800">2x</option>
                    </select>

                    <button onClick={toggleFullscreen} className="p-2 text-slate-400 hover:text-white transition-colors ml-2">
                      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Slide Renderer Component
function SlideRenderer({ slide }: { slide: SlideData }) {
  const content = Array.isArray(slide.content) ? slide.content.join('\n') : slide.content;

  const variants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.05, y: -20 }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl aspect-video bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col p-12 relative overflow-hidden"
    >
      {/* Decorative background elements based on type */}
      {slide.type === 'TITLE' && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40" />
      )}
      {slide.type === 'CODE' && (
        <div className="absolute inset-0 bg-slate-950" />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {slide.type === 'TITLE' ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mb-8 border border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
            >
              <Sparkles className="w-12 h-12 text-indigo-400" />
            </motion.div>
            <h1 className="text-5xl font-black text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {slide.title}
            </h1>
            <p className="text-2xl text-indigo-300 max-w-2xl">{content}</p>
          </div>
        ) : (
          <>
            <div className="mb-8 pb-4 border-b border-slate-800">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <span className="w-2 h-8 bg-indigo-500 rounded-full mr-4" />
                {slide.title}
              </h2>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              {slide.type === 'BULLETS' && (
                <ul className="space-y-6 w-full max-w-2xl">
                  {content.split('\n').map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      className="flex items-start text-xl text-slate-300"
                    >
                      <span className="mr-4 text-indigo-500 mt-1">✦</span>
                      {item.replace(/^[-\*]\s*/, '')}
                    </motion.li>
                  ))}
                </ul>
              )}

              {slide.type === 'CODE' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-6 font-mono text-sm text-green-400 shadow-inner overflow-hidden"
                >
                  <pre className="whitespace-pre-wrap"><code>{content}</code></pre>
                </motion.div>
              )}

              {slide.type === 'FORMULA' && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-serif text-amber-400 tracking-wider text-center bg-slate-950/50 p-12 rounded-2xl border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.1)]"
                >
                  {content}
                </motion.div>
              )}

              {slide.type === 'DIAGRAM' && (
                <div className="w-full h-full border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center bg-slate-800/20">
                  <p className="text-slate-400 text-center px-8 text-lg">{content}</p>
                </div>
              )}

              {['COMPARISON', 'SUMMARY'].includes(slide.type) && (
                <div className="w-full text-lg text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {content}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
