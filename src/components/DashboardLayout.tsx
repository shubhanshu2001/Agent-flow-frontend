import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SessionCard from './SessionCard';
import type { Session } from '../types';
import * as sessionsApi from '../api/sessionsApi';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface SidebarContentProps {
  newSessionTitle: string;
  setNewSessionTitle: (value: string) => void;
  handleCreateSession: (e: React.FormEvent) => void;
  isCreating: boolean;
  isLoading: boolean;
  sessions: Session[];
  onSessionClick?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  newSessionTitle,
  setNewSessionTitle,
  handleCreateSession,
  isCreating,
  isLoading,
  sessions,
  onSessionClick
}) => (
  <>
    <div className="p-4 border-b border-slate-100 shrink-0">
      <form onSubmit={handleCreateSession} className="flex gap-2">
        <input
          type="text"
          placeholder="New Session..."
          value={newSessionTitle}
          onChange={(e) => setNewSessionTitle(e.target.value)}
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isCreating || !newSessionTitle.trim()}
          className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center min-w-[40px]"
        >
          {isCreating ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </form>
    </div>
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {isLoading ? (
        <div className="text-center py-4 text-slate-400 text-sm">Loading...</div>
      ) : sessions.length === 0 ? (
         <div className="text-center py-8 text-slate-400 text-sm">No sessions yet.</div>
      ) : (
        sessions.map((session) => (
          <SessionCard 
            key={session.id} 
            session={session} 
            onClick={onSessionClick}
          />
        ))
      )}
    </div>
  </>
);

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const loadSessions = async () => {
    try {
      const data = await sessionsApi.getSessions();
      // Ensure we have an array
      setSessions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load sessions", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionTitle.trim()) return;

    setIsCreating(true);
    try {
      const newSession = await sessionsApi.createSession(newSessionTitle);
      setSessions([newSession, ...sessions]);
      setNewSessionTitle('');
    } catch (error) {
      console.error("Failed to create session", error);
    } finally {
      setIsCreating(false);
    }
  };

  const sidebarProps = {
    newSessionTitle,
    setNewSessionTitle,
    handleCreateSession,
    isCreating,
    isLoading,
    sessions,
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Desktop Sidebar */}
        <aside className="w-80 bg-white border-r border-slate-200 flex flex-col hidden md:flex h-full">
          <SidebarContent 
            {...sidebarProps} 
            onSessionClick={() => setIsMobileMenuOpen(false)}
          />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
             {/* Backdrop */}
             <div 
               className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
               onClick={() => setIsMobileMenuOpen(false)}
             />
             
             {/* Drawer */}
             <aside className="relative w-[85%] max-w-xs bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">Sessions</h2>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-md text-slate-500 hover:bg-slate-100"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <SidebarContent 
                  {...sidebarProps} 
                  onSessionClick={() => setIsMobileMenuOpen(false)} 
                />
             </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative h-full">
           {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;