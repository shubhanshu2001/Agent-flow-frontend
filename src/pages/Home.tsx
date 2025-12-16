import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Home: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-800 mb-1">No session selected</h3>
        <p className="text-slate-500 max-w-sm">
          Select a session from the sidebar to view the conversation, or create a new session to get started.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Home;