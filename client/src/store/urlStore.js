import { create } from 'zustand';
import api from '../api/axios';

const useURLStore = create((set) => ({
  urls: [],
  loading: false,
  fetchURLs: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/url/my-urls');
      set({ urls: res.data.body, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  shortenURL: async (url) => {
    try {
      const res = await api.post('/url', { url });
      set((state) => ({ urls: [res.data.body, ...state.urls] }));
      return res.data.body;
    } catch (error) {
      throw error;
    }
  },
  deleteURL: async (id) => {
    try {
      await api.delete(`/url/${id}`);
      set((state) => ({
        urls: state.urls.filter((url) => url._id !== id),
      }));
    } catch (error) {
      throw error;
    }
  },
}));

export default useURLStore;
