import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import useAuth from '@/core/composables/useAuth';

const toast = useToast();

export default defineStore('auth', () => {
  const auth = useAuth({
    loginUrl: '/login',
    logoutUrl: '/logout',
  });

  async function login({ email, password }) {
    try {
      const res = await auth.login(email, password);
      toast.success(
        res.data.result?.user?.first_name
          ? `Welcome ${res.data.result?.user?.first_name}!`
          : 'Welcome'
      );
    } catch (e) {
      toast.error(e.message);
      throw new Error(e.message);
    }
  }

  async function logout() {
    try {
      const res = await auth.logout();
      toast.success(res.data.message);
    } catch (e) {
      // toast.error(e.message)
      // throw new Error(e.message);
      console.info(e.message);
    } finally {
      localStorage.removeItem('token');
    }
  }

  return { login, logout };
});
