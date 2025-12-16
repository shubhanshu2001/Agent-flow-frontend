import axiosClient from './axiosClient';
import type { Session, Message, SendMessageResponse } from '../types';

export const getSessions = async (): Promise<Session[]> => {
  const response = await axiosClient.get<any>('/sessions/');
  
  // Handle case where response might be { sessions: [...] }
  if (response.data && Array.isArray(response.data.sessions)) {
    return response.data.sessions;
  }
  
  // Handle case where response is directly [...]
  if (Array.isArray(response.data)) {
    return response.data;
  }
  
  return [];
};

export const createSession = async (title: string): Promise<Session> => {
  const response = await axiosClient.post<Session>('/sessions/', { title });
  return response.data;
};

export const getSessionMessages = async (sessionId: string): Promise<Message[]> => {
  // Use <any> to handle variable response structures (array vs object with messages field)
  const response = await axiosClient.get<any>(`/sessions/${sessionId}`);
  
  // Check if response is the Session object containing messages (common pattern)
  if (response.data && Array.isArray(response.data.messages)) {
    return response.data.messages;
  }
  
  // Check if response is directly the array of messages
  if (Array.isArray(response.data)) {
    return response.data;
  }
  
  // Fallback
  return [];
};

export const sendMessage = async (sessionId: string, message: string): Promise<SendMessageResponse> => {
  // Updated payload key to 'content' to match typical backend schemas (fixing 422 error)
  const response = await axiosClient.post<SendMessageResponse>(`/sessions/${sessionId}/messages`, { content: message });
  return response.data;
};