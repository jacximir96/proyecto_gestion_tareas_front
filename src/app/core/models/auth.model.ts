export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  meta: {
    success: boolean;
    errors: any[];
  };
  data?: {
    token: string;
    expiresInMinutes: number;
  };
}
