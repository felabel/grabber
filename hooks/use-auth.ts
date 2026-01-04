/**
 * Authentication Hook
 * 
 * Custom hook for authentication-related functionality.
 * Provides easy access to auth state and actions.
 */

import { useUserStore } from '@/store/user-store';
import { useRouter } from 'expo-router';

export function useAuth() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const setIsLoading = useUserStore((state) => state.setIsLoading);

  const handleLogin = async (user: Parameters<typeof login>[0], tokens: Parameters<typeof login>[1]) => {
    setIsLoading(true);
    try {
      await login(user, tokens);
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    isLoading: useUserStore((state) => state.isLoading),
  };
}

