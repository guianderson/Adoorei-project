import { loginRequest, loginResponse } from '../dto/auth.dto';

export interface IAuthService {
  login(user: loginRequest): Promise<loginResponse>;
}
