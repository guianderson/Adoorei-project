import { RegisterRequest, RegisterResponse } from './dto/register.dto';

export class RegisterService implements RegisterService {
  async registerUser(user: RegisterRequest): Promise<RegisterResponse> {
    return await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        username: user.siteName,
        password: user.password,
        name: {
          firstname: user.name.firstName,
          lastname: user.name.lastName,
        },
        address: {
          city: 'São Paulo',
          street: 'Av. Paulista',
          number: 1000,
          zipcode: '01310-200',
          geolocation: {
            lat: '-23.563999',
            long: '-46.654199',
          },
        },
        phone: user.phone,
      }),
    }).then((res: RegisterResponse) => {
      const result: RegisterResponse = res;
      if (!result.ok || result.status !== 200) {
        throw new Error(result.statusText);
      }
      return result;
    });
  }
}
