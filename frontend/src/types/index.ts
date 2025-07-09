// ✅ src/types/index.ts (centralisation des types)

// ➕ Types Auth
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

// ➕ Types Articles
export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author?: {
    username: string;
  };
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface UpdatePostData {
  title: string;
  content: string;
}

// ➕ Types context auth
export interface AuthContextType {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

// ➕ Types props génériques
export interface PostCardProps {
  post: Post;
  onPostUpdated?: () => void;
}

export interface CreatePostFormProps {
  onPostCreated?: () => void;
}

export interface AuthFormState {
  username: string;
  password: string;
  error: string;
  success?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}
