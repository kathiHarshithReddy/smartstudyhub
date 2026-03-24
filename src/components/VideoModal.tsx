import React, { useState } from 'react';
import { Subject } from '../data/curriculum';
import { motion, AnimatePresence } from 'motion/react';
import { X, PlayCircle, ListVideo } from 'lucide-react';
import { cn } from '../lib/utils';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: Subject;
}

export function VideoModal({ isOpen, onClose, subject }: VideoModalProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  if (!isOpen) return null;

  const activeVideo = subject.videos[activeVideoIndex];

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
          className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
        >
          {/* Main Video Area */}
          <div className="flex-1 flex flex-col bg-black">
            <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 lg:hidden">
              <h2 className="text-lg font-bold text-slate-100 truncate pr-4">
                {subject.name} Tutorials
              </h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative w-full aspect-video bg-slate-950 flex-1">
              {activeVideo ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  No video selected
                </div>
              )}
            </div>
            
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <h3 className="text-xl font-bold text-white mb-1">{activeVideo?.title}</h3>
              <p className="text-indigo-400 text-sm flex items-center">
                <PlayCircle className="w-4 h-4 mr-1.5" />
                {activeVideo?.channel}
              </p>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-64 lg:h-auto">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center hidden lg:flex">
              <h3 className="font-bold text-slate-100 flex items-center">
                <ListVideo className="w-5 h-5 mr-2 text-indigo-400" />
                Playlist ({subject.videos.length})
              </h3>
              <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
              {subject.videos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideoIndex(index)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl mb-2 flex gap-3 transition-all group",
                    activeVideoIndex === index 
                      ? "bg-indigo-600/20 border border-indigo-500/30" 
                      : "hover:bg-slate-800 border border-transparent"
                  )}
                >
                  <div className="relative flex-shrink-0 w-32 aspect-video bg-slate-800 rounded-lg overflow-hidden">
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                      alt={video.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                    {activeVideoIndex === index && (
                      <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center backdrop-blur-[1px]">
                        <PlayCircle className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <h4 className={cn(
                      "text-sm font-medium line-clamp-2 mb-1",
                      activeVideoIndex === index ? "text-indigo-300" : "text-slate-200 group-hover:text-white"
                    )}>
                      {video.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">{video.channel}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
