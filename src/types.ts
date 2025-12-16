export interface User {
  id: string;
  fullname: string;
  email: string;
}

export interface Session {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
} 

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  access_token?: string;
  token?: string;
}

export interface SendMessageResponse {
  user_message: Message;
  assistant_message: Message;
}