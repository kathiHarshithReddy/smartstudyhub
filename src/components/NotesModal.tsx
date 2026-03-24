import React, { useState, useEffect } from 'react';
import { Subject } from '../data/curriculum';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, FileText, Copy, Download, Play } from 'lucide-react';
import { generateStudyNotes } from '../services/gemini';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: Subject;
  initialTopic: string;
  onAnimateTopic: (topic: string) => void;
}

export function NotesModal({ isOpen, onClose, subject, initialTopic, onAnimateTopic }: NotesModalProps) {
  const [topic, setTopic] = useState(initialTopic);
  const [provider, setProvider] = useState<'claude' | 'gemini'>('gemini');
  const [notes, setNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTopic(initialTopic);
      setNotes('');
      setError('');
    }
  }, [isOpen, initialTopic]);

  const handleGenerate = async () => {
    if (!topic) return;
    
    setIsGenerating(true);
    setError('');
    setNotes('');

    try {
      // We only implement Gemini here as requested
      const generatedNotes = await generateStudyNotes(subject.name, topic);
      setNotes(generatedNotes);
    } catch (err: any) {
      setError(err.message || 'Failed to generate notes. Ensure your GEMINI_API_KEY is set.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([notes], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${subject.code}_${topic.replace(/\s+/g, '_')}_Notes.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
            <div>
              <h2 className="text-2xl font-bold text-slate-100 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-indigo-400" />
                AI Study Notes
              </h2>
              <p className="text-slate-400 text-sm mt-1">{subject.code} - {subject.name}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Controls */}
          <div className="p-6 bg-slate-800/30 border-b border-slate-800 space-y-4">
            {/* Provider Toggle */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setProvider('claude')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    provider === 'claude' ? "bg-cyan-900/40 text-cyan-300 shadow-sm" : "text-slate-400 hover:text-slate-300"
                  )}
                >
                  ✦ Claude
                </button>
                <button
                  onClick={() => setProvider('gemini')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    provider === 'gemini' ? "bg-amber-900/40 text-amber-300 shadow-sm" : "text-slate-400 hover:text-slate-300"
                  )}
                >
                  ◆ Gemini
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Select Topic</label>
                <select 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none"
                >
                  {subject.topics.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={cn(
                    "w-full sm:w-auto px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center",
                    isGenerating ? "bg-slate-700 text-slate-400 cursor-not-allowed" : 
                    provider === 'gemini' ? "bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.4)]" :
                    "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]"
                  )}
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {provider === 'gemini' ? <Sparkles className="w-5 h-5 mr-2" /> : <span className="mr-2">✦</span>}
                      Generate Notes
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-950 min-h-[300px]">
            {error ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-red-400 max-w-md">{error}</p>
              </div>
            ) : notes ? (
              <div className="prose prose-invert max-w-none prose-headings:text-indigo-300 prose-a:text-indigo-400 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
                <div className="markdown-body">
                  <Markdown>{notes}</Markdown>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-medium text-slate-400">Ready to generate</p>
                <p className="text-sm mt-2 max-w-sm">
                  Select a topic and click Generate to create comprehensive, exam-ready study notes powered by AI.
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-between items-center">
            <div className="flex gap-3">
              <button 
                onClick={handleCopy}
                disabled={!notes}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy to clipboard"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button 
                onClick={handleDownload}
                disabled={!notes}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Download as TXT"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => onAnimateTopic(topic)}
              disabled={!notes}
              className="flex items-center px-4 py-2 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-500/30 group relative"
            >
              <Play className="w-4 h-4 mr-2" />
              Animate It
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-800 text-xs text-slate-300 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-xl border border-slate-700 pointer-events-none text-left">
                <p className="mb-1">⏱ <strong>Time:</strong> Takes 1-3 mins</p>
                <p className="mb-1">🔑 <strong>API Key:</strong> Requires Gemini API Key</p>
                <p>✏️ <strong>Editable:</strong> Review script before rendering</p>
                <div className="absolute top-full right-8 border-4 border-transparent border-t-slate-800" />
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
