import axiosClient from './axiosClient.ts';
import type { AuthResponse } from '../types.ts';

export const signup = async (data: { fullname: string; email: string; password: string }) => {
  return await axiosClient.post('/auth/signup', data);
};

export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  const response = await axiosClient.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const logout = async () => {
  return await axiosClient.post('/auth/logout');
};
