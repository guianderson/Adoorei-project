import { defineStore } from 'pinia';
import { AuthService } from '../services/auth/AuthService';
import { loginRequest } from 'src/services/auth/dto/auth.dto';

const service = new AuthService();
export const useAuthStore = defineStore('auth', {
  state: () => ({
    lastActivityTime: 0,
    user: {
      email: '',
    },
    token: '',
  }),
  getters: {
    isLogged: (state) => !!state.token,
  },
  actions: {
    async authenticate(user: loginRequest) {
      const data = await service.authUser(user);
      this.token = data.token;
      this.user.email = user.email;
      this.lastActivityTime = Date.now();
    },

    async logout() {
      localStorage.removeItem('auth');
    },
  },
  persist: true,
});
