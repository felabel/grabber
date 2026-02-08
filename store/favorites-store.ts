/**
 * Favorites Store (Zustand)
 *
 * Stores favourite product IDs. Use productIds as a list (no Array.from in selectors
 * to avoid unnecessary re-renders / loops). Toggle/add/remove by product id.
 */

import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritesState {
  productIds: string[];

  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

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

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      productIds: [],

      toggle: (productId) => {
        set((state) => {
          const has = state.productIds.includes(productId);
          const productIds = has
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId];
          return { productIds };
        });
      },

      add: (productId) => {
        set((state) => {
          if (state.productIds.includes(productId)) return state;
          return { productIds: [...state.productIds, productId] };
        });
      },

      remove: (productId) => {
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        }));
      },

      isFavorite: (productId) => get().productIds.includes(productId),
    }),
    {
      name: 'grabber-favorites-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({ productIds: state.productIds }),
    }
  )
);
