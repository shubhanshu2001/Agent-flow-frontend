import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import type { Message } from '../types';
import * as sessionsApi from '../api/sessionsApi';

const SessionChat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await sessionsApi.getSessionMessages(id);
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load messages", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [id]);

  const handleSendMessage = async (text: string) => {
    if (!id) return;

    // Optimistic update
    const tempMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempMessage]);
    setIsSending(true);

    try {
      const response = await sessionsApi.sendMessage(id, text);
      // Replace messages with actual server response or just append.
      // Since the API returns both user and assistant message,
      // it's safer to reload or append the assistant one.
      // Here we will filter out our temp message and add both from server to ensure IDs match
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== tempMessage.id);
        return [...filtered, response.user_message, response.assistant_message];
      });
    } catch (error: any) {
      console.error("Failed to send message", error);
      
      // Log validation errors if available
      if (error.response?.data) {
        console.error("Server response:", error.response.data);
      }

      // Remove optimistic message on failure
      setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
      
      // Attempt to extract a meaningful error message
      let errorMessage = "Failed to send message. Please try again.";
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
             // Handle Pydantic/FastAPI validation errors
             errorMessage = `Validation error: ${error.response.data.detail.map((e: any) => e.msg).join(', ')}`;
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {isLoading ? (
             <div className="flex items-center justify-center h-full text-slate-400">Loading chat history...</div>
          ) : messages.length === 0 ? (
             <div className="flex items-center justify-center h-full text-slate-400">Start the conversation...</div>
          ) : (
            messages.map((msg, index) => (
              <ChatMessage key={msg.id || index} message={msg} />
            ))
          )}
          {isSending && (
             <div className="flex w-full justify-start py-2">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm">
                   <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                   </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSend={handleSendMessage} disabled={isSending} />
      </div>
    </DashboardLayout>
  );
};

export default SessionChat;