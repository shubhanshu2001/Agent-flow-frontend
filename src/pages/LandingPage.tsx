import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center p-4 pt-16 pb-12">
        <div className="max-w-3xl text-center mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Agentic Workflow Companion
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Experience the future of intelligent collaboration. Seamlessly manage your workflows and chat sessions with our advanced AI companion designed for professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 rounded-xl bg-white text-slate-700 border border-slate-200 font-semibold shadow-sm hover:bg-slate-50 transition-all hover:shadow-md"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Agents & Tools Section */}
        <div className="max-w-6xl mx-auto w-full px-4 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Powered by Multi-Agent Intelligence</h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Our workflow is orchestrated by a triad of specialized agents, equipped with powerful tools to plan, execute, and refine any complex task.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Planner */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">The Planner</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Strategically analyzes your objectives, breaking down complex queries into structured, actionable steps to ensure a logical path to success.
              </p>
            </div>

            {/* Executor */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">The Executor</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Armed with a multi-tool suite, this agent performs the heavy lifting—fetching data, running calculations, and executing tasks precisely.
              </p>
            </div>

            {/* Critic */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">The Critic</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Ensures quality and accuracy by reviewing the Executor's output, offering refinements, and validating the final response before it reaches you.
              </p>
            </div>
          </div>
        </div>

      </div>
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100 bg-white">
        © {new Date().getFullYear()} Agentic Workflow. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;