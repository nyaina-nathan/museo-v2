export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
  updated_at: string | null;
}

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}