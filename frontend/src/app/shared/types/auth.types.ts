export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  privileges: string[];
}

export interface LoginDto {
  username?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  expiresAt?: string;
  user: User;
}
