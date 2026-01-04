/**
 * App Store (Zustand)
 * 
 * Manages global app state that's not user or cart specific:
 * - Selected delivery location/address
 * - Delivery fee configuration
 * - App settings
 * - Network status
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, Address } from '@/types';

interface AppStoreState extends AppState {
  // Actions
  setSelectedLocation: (addressId: string, address: Address) => void;
  clearSelectedLocation: () => void;
  setDeliveryFee: (fee: number) => void;
  setFreeDeliveryThreshold: (threshold: number) => void;
  setIsOnline: (isOnline: boolean) => void;
  updateAppState: (updates: Partial<AppState>) => void;
}

const initialState: AppState = {
  selectedLocation: undefined,
  deliveryFee: 2.99, // Default delivery fee
  freeDeliveryThreshold: 500, // Default: free delivery over $50
  isOnline: true,
  appVersion: '1.0.0',
};

export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      ...initialState,

      setSelectedLocation: (addressId, address) => {
        set({
          selectedLocation: {
            addressId,
            address,
          },
        });
      },

      clearSelectedLocation: () => {
        set({
          selectedLocation: undefined,
        });
      },

      setDeliveryFee: (fee) => {
        set({ deliveryFee: fee });
      },

      setFreeDeliveryThreshold: (threshold) => {
        set({ freeDeliveryThreshold: threshold });
      },

      setIsOnline: (isOnline) => {
        set({ isOnline });
      },

      updateAppState: (updates) => {
        set((state) => ({
          ...state,
          ...updates,
        }));
      },
    }),
    {
      name: 'grabber-app-storage',
      // Don't persist network status or temporary states
      partialize: (state) => ({
        selectedLocation: state.selectedLocation,
        deliveryFee: state.deliveryFee,
        freeDeliveryThreshold: state.freeDeliveryThreshold,
        appVersion: state.appVersion,
      }),
    }
  )
);

