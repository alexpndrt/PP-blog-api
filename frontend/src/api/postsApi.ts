// ✅ src/api/postsApi.ts

import api from './axiosInstance';

export const getPosts = (token: any) => {
  return api.get('/posts', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPostById = (token: any, id: any) => {
  return api.get(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createPost = (token: any, postData: any) => {
  return api.post('/posts', postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updatePost = (token: any, postId: any, postData: any) => {
  return api.put(`/posts/${postId}`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deletePost = (token: any, postId: any) => {
  return api.delete(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
