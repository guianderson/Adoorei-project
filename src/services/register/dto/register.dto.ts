export interface RegisterRequest {
  email: string;
  siteName: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phone: string;
}

export interface RegisterResponse {
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  url: string;
}
