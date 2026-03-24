import React, { useState } from 'react';
import { Subject } from '../data/curriculum';
import { motion, AnimatePresence } from 'motion/react';
import { Play, FileText, Sparkles, BookOpen, ChevronDown, ChevronUp, X } from 'lucide-react';
import { generateStudyNotes } from '../services/gemini';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

interface SubjectCardProps {
  subject: Subject;
  onOpenNotes: () => void;
  onOpenVideo: () => void;
  onOpenAnimate: () => void;
}

export function SubjectCard({ subject, onOpenNotes, onOpenVideo, onOpenAnimate }: SubjectCardProps) {
  const [isInlineNotesOpen, setIsInlineNotesOpen] = useState(false);
  const [inlineNotesContent, setInlineNotesContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGeminiNotes = async () => {
    if (isInlineNotesOpen && inlineNotesContent) {
      setIsInlineNotesOpen(false);
      return;
    }

    setIsGenerating(true);
    setIsInlineNotesOpen(true);
    setError('');
    
    try {
      // Generate notes for the first topic by default for inline view
      const notes = await generateStudyNotes(subject.name, subject.topics[0]);
      setInlineNotesContent(notes);
    } catch (err: any) {
      setError(err.message || 'Failed to generate notes. Please check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Math': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Core': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'Project': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="flex flex-col">
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full border border-slate-700">
                {subject.code}
              </span>
              <span className={cn("px-3 py-1 text-xs font-semibold rounded-full border", getCategoryColor(subject.category))}>
                {subject.category}
              </span>
            </div>
            <span className="text-slate-500 text-xs font-medium">
              {subject.credits} Credits
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-slate-100 mb-2 leading-tight">
            {subject.name}
          </h3>
          
          <div className="flex items-center text-slate-400 text-sm mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            {subject.topics.length} Topics
          </div>

          <div className="space-y-3">
            <button 
              onClick={onOpenVideo}
              className="w-full flex items-center justify-center py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
            >
              <Play className="w-4 h-4 mr-2 fill-current" />
              Watch Tutorials
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={onOpenNotes}
                className="flex items-center justify-center py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium transition-colors border border-slate-700"
              >
                <FileText className="w-4 h-4 mr-2 text-cyan-400" />
                AI Notes
              </button>
              
              <button 
                onClick={handleGeminiNotes}
                className={cn(
                  "flex items-center justify-center py-2 px-3 rounded-xl text-sm font-medium transition-colors border",
                  isInlineNotesOpen 
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                )}
              >
                <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                Gemini Notes
              </button>
            </div>

            <button 
              onClick={onOpenAnimate}
              className="w-full flex items-center justify-center py-2 px-4 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-xl text-sm font-medium transition-colors border border-slate-700/50 group/anim relative"
            >
              <span className="mr-2">🎬</span>
              Animate Topic
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-xs text-slate-300 rounded-lg opacity-0 invisible group-hover/anim:opacity-100 group-hover/anim:visible transition-all z-20 shadow-xl border border-slate-700 pointer-events-none">
                <p className="mb-1">⏱ <strong>Time:</strong> Takes 1-3 mins</p>
                <p className="mb-1">🔑 <strong>API Key:</strong> Requires Gemini API Key</p>
                <p>✏️ <strong>Editable:</strong> Review script before rendering</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Inline Notes Panel */}
      <AnimatePresence>
        {isInlineNotesOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 relative shadow-lg">
              <button 
                onClick={() => setIsInlineNotesOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center mb-4 text-amber-400 font-medium">
                <Sparkles className="w-5 h-5 mr-2" />
                Gemini Quick Notes: {subject.topics[0]}
              </div>

              {isGenerating ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-800 rounded w-full"></div>
                  <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-800 rounded w-1/2 mt-4"></div>
                </div>
              ) : error ? (
                <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  {error}
                </div>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none prose-headings:text-amber-300 prose-a:text-indigo-400 h-64 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="markdown-body">
                    <Markdown>{inlineNotesContent}</Markdown>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
