import { create } from 'zustand';
import api from '../api/axios';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  checkAuth: async () => {
    try {
      const res = await api.get('/user/me');
      set({ user: res.data.body, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: async () => {
    try {
      await api.post('/user/logout');
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout failed', error);
    }
  },
}));

export default useAuthStore;
