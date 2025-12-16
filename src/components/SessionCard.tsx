import React from 'react';
import type { Session } from '../types.ts';
import { useNavigate, useParams } from 'react-router-dom';

interface SessionCardProps {
  session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isActive = id === session.id;

  return (
    <div
      onClick={() => navigate(`/sessions/${session.id}`)}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
        isActive
          ? 'bg-blue-50 border-blue-200 shadow-sm'
          : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
      }`}
    >
      <h3 className={`font-medium text-sm truncate ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
        {session.title || 'Untitled Session'}
      </h3>
      <p className="text-xs text-slate-400 mt-1">
        {new Date(session.created_at || Date.now()).toLocaleDateString()}
      </p>
    </div>
  );
};

export default SessionCard;