import React, { useState, type FormEvent, type KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-4">
      <div className="relative flex items-end gap-2 max-w-4xl mx-auto">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-xl border-0 bg-slate-100 py-3 px-4 text-slate-900 shadow-inner placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 sm:text-sm max-h-32 min-h-[44px]"
          style={{ height: 'auto', minHeight: '44px' }}
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 p-3 text-white shadow-sm transition-colors hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;