// ✅ src/api/authApi.ts

import api from './axiosInstance';

export const loginUser = (data: any) => {
  return api.post('/login', data);
};

export const registerUser = (data: any) => {
  return api.post('/register', data);
};