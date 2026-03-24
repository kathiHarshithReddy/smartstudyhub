import React, { useState } from 'react';
import { curriculum, Semester, Subject } from './data/curriculum';
import { SubjectCard } from './components/SubjectCard';
import { NotesModal } from './components/NotesModal';
import { VideoModal } from './components/VideoModal';
import { AnimateModal } from './components/AnimateModal';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Code, Database, Cpu, Globe, Network } from 'lucide-react';

export default function App() {
  const [activeSemester, setActiveSemester] = useState<number>(1); // Default to Sem 1
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAnimateModalOpen, setIsAnimateModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const handleOpenNotes = (subject: Subject, topic?: string) => {
    setSelectedSubject(subject);
    setSelectedTopic(topic || subject.topics[0]);
    setIsNotesModalOpen(true);
  };

  const handleOpenVideo = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsVideoModalOpen(true);
  };

  const handleOpenAnimate = (subject: Subject, topic?: string) => {
    setSelectedSubject(subject);
    setSelectedTopic(topic || subject.topics[0]);
    setIsAnimateModalOpen(true);
  };

  const activeSemData = curriculum.find(s => s.id === activeSemester);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Animated Background Particles (Simplified CSS version) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-cyan-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-6 ring-1 ring-indigo-500/30"
          >
            <GraduationCap className="w-8 h-8 text-indigo-400 mr-3" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              CMRIT ISE StudyHub
            </h1>
          </motion.div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            VTU 2022 Scheme • Information Science & Engineering
          </p>
          <p className="text-sm text-slate-500 mt-2">
            AI-powered study notes, curated YouTube playlists, and animated video generation.
          </p>
        </header>

        {/* Semester Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {curriculum.map((sem) => (
            <button
              key={sem.id}
              onClick={() => setActiveSemester(sem.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSemester === sem.id
                  ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 ring-1 ring-slate-700/50'
              }`}
            >
              Sem {sem.id}
            </button>
          ))}
        </div>

        {/* Subject Grid */}
        <motion.div 
          key={activeSemester}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeSemData?.subjects.map((subject) => (
            <SubjectCard 
              key={subject.code} 
              subject={subject} 
              onOpenNotes={() => handleOpenNotes(subject)}
              onOpenVideo={() => handleOpenVideo(subject)}
              onOpenAnimate={() => handleOpenAnimate(subject)}
            />
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p className="mb-2">Built for CMRIT Bangalore • ISE Branch • VTU 2022 Scheme</p>
          <p>Powered by Gemini AI • Curated YouTube Tutorials • Interactive Study Notes</p>
        </div>
      </footer>

      {/* Modals */}
      {selectedSubject && (
        <>
          <NotesModal 
            isOpen={isNotesModalOpen} 
            onClose={() => setIsNotesModalOpen(false)} 
            subject={selectedSubject}
            initialTopic={selectedTopic}
            onAnimateTopic={(topic) => {
              setIsNotesModalOpen(false);
              handleOpenAnimate(selectedSubject, topic);
            }}
          />
          <VideoModal 
            isOpen={isVideoModalOpen} 
            onClose={() => setIsVideoModalOpen(false)} 
            subject={selectedSubject} 
          />
          <AnimateModal 
            isOpen={isAnimateModalOpen} 
            onClose={() => setIsAnimateModalOpen(false)} 
            subject={selectedSubject}
            topic={selectedTopic}
          />
        </>
      )}
    </div>
  );
}
