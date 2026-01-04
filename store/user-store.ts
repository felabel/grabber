/**
 * User Store (Zustand)
 * 
 * Manages user authentication and profile state:
 * - Authentication tokens
 * - User profile data
 * - Authentication status
 * 
 * Why Zustand: Same reasons as cart store - simplicity, performance, and ease of use
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import type { User, UserProfile, AuthTokens } from '@/types';

interface UserState {
  user: User | null;
  profile: UserProfile | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  setProfile: (profile: UserProfile) => void;
  setTokens: (tokens: AuthTokens) => void;
  login: (user: User, tokens: AuthTokens) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setIsLoading: (loading: boolean) => void;
}

// Custom secure storage for sensitive auth data
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch (error) {
      console.error('Error getting item from secure store:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.error('Error setting item in secure store:', error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.error('Error removing item from secure store:', error);
    }
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => {
        set({ user, isAuthenticated: true });
      },

      setProfile: (profile) => {
        set({ profile });
      },

      setTokens: (tokens) => {
        set({ tokens });
      },

      login: async (user, tokens) => {
        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: async () => {
        set({
          user: null,
          profile: null,
          tokens: null,
          isAuthenticated: false,
        });
      },

      updateProfile: (updates) => {
        set((state) => {
          if (state.profile) {
            return {
              profile: { ...state.profile, ...updates },
              user: state.user ? { ...state.user, ...updates } : null,
            };
          }
          return state;
        });
      },

      setIsLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'grabber-user-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

