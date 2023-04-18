import { loginRequest, loginResponse } from './dto/auth.dto';

export class AuthService implements AuthService {
  async authUser(user: loginRequest): Promise<loginResponse> {
    return await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'mor_2314',
        password: '83r5^_',
      }),
    })
      .then((res: Response) => {
        return res.json();
      })
      .then((data: any) => {
        const result: loginResponse = {
          token: data.token,
        };
        if (!result.token) {
          throw new Error();
        }
        return result;
      });
  }
}
