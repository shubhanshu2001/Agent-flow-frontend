import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  // Robust role detection
  const rawRole = message.role || (message as any).type || (message as any).sender || '';
  const role = String(rawRole).toLowerCase();
  const isUser = role === 'user' || role === 'human';

  // Pre-process content to handle <br> tags
  const processedContent = message.content ? message.content.replace(/<br\s*\/?>/gi, '\n') : '';

  return (
    <div 
      className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative max-w-[90%] sm:max-w-[85%] rounded-2xl px-5 py-4 shadow-sm text-sm overflow-hidden ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
        }`}
      >
        <div className={`prose max-w-none ${isUser ? 'prose-invert' : 'prose-slate'} prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent`}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Links
              a: ({node, ...props}) => (
                <a 
                  {...props} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`underline decoration-1 underline-offset-2 hover:decoration-2 font-medium ${isUser ? 'text-white' : 'text-blue-600'}`}
                />
              ),
              // Code blocks
              pre: ({node, ...props}) => (
                <div className="not-prose my-4 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                  <pre {...props} className="overflow-x-auto p-4 text-xs sm:text-sm text-slate-50 font-mono leading-relaxed" />
                </div>
              ),
              code: ({node, ...props}) => {
                const isInline = !props.className?.includes('language-');
                return isInline ? (
                  <code {...props} className={`px-1.5 py-0.5 rounded text-xs font-mono font-medium ${isUser ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-700 border border-slate-200'}`} />
                ) : (
                  <code {...props} />
                );
              },
              // Tables - The key fix for "messy" UI
              table: ({node, ...props}) => (
                <div className="my-6 w-full overflow-hidden rounded-lg border border-slate-200/60 shadow-sm">
                  <div className="overflow-x-auto">
                    <table {...props} className="min-w-full divide-y divide-slate-200/60 text-left text-sm" />
                  </div>
                </div>
              ),
              thead: ({node, ...props}) => (
                <thead {...props} className={isUser ? 'bg-blue-700/50 text-blue-100' : 'bg-slate-50 text-slate-700'} />
              ),
              tbody: ({node, ...props}) => (
                <tbody {...props} className={`divide-y divide-slate-200/60 ${isUser ? 'bg-transparent' : 'bg-white'}`} />
              ),
              tr: ({node, ...props}) => (
                <tr {...props} className={`transition-colors ${isUser ? 'hover:bg-blue-700/30' : 'hover:bg-slate-50/50'}`} />
              ),
              th: ({node, ...props}) => (
                <th {...props} className="px-4 py-3 font-semibold text-xs uppercase tracking-wider" />
              ),
              td: ({node, ...props}) => (
                <td {...props} className={`px-4 py-3 align-top ${isUser ? 'text-blue-50' : 'text-slate-600'}`} />
              ),
              // Lists
              ul: ({node, ...props}) => <ul {...props} className="my-2 space-y-1 list-disc list-outside ml-4" />,
              ol: ({node, ...props}) => <ol {...props} className="my-2 space-y-1 list-decimal list-outside ml-4" />,
              li: ({node, ...props}) => <li {...props} className="pl-1" />,
              // Headings
              h1: ({node, ...props}) => <h1 {...props} className="text-xl font-bold mb-3 mt-4 first:mt-0" />,
              h2: ({node, ...props}) => <h2 {...props} className="text-lg font-bold mb-2 mt-4" />,
              h3: ({node, ...props}) => <h3 {...props} className="text-base font-bold mb-2 mt-3" />,
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;