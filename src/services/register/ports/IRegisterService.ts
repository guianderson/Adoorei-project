import { RegisterRequest, RegisterResponse } from '../dto/register.dto';

export interface IResgistreService {
  registerUser(user: RegisterRequest): Promise<RegisterResponse>;
}
