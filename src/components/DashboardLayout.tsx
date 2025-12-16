import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SessionCard from './SessionCard';
import type { Session } from '../types';
import * as sessionsApi from '../api/sessionsApi';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-slate-200 flex flex-col hidden md:flex h-full">
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
                className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
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
                <SessionCard key={session.id} session={session} />
              ))
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative h-full">
           {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;