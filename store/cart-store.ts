/**
 * Cart Store (Zustand)
 * 
 * Manages shopping cart state including:
 * - Cart items (products, quantities)
 * - Cart calculations (subtotal, delivery fee, total)
 * - Cart operations (add, remove, update quantity)
 * 
 * Why Zustand over Redux Toolkit?
 * - Simpler API with less boilerplate
 * - Better performance for React Native
 * - Smaller bundle size
 * - Built-in TypeScript support
 * - No need for middleware for async actions (can use async actions directly)
 * - Easier to use with hooks (just call useCartStore)
 */

import type { Cart, CartItem, Product } from '@/types';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartState {
  cart: Cart;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryFee: (fee: number) => void;
  setFreeDeliveryThreshold: (threshold: number) => void;
  setDiscount: (discount: number) => void;
  setSelectedAddressId: (addressId: string) => void;
  
  // Computed/getters
  getItemQuantity: (productId: string) => number;
  getCartItemCount: () => number;
  calculateCart: () => void;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  deliveryFee: 0,
  freeDeliveryThreshold: 500, // Default: free delivery over $5.00
  discount: 0,
  total: 0,
};

// Custom storage for Zustand persistence using SecureStore
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

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: initialCart,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.items.find(
            (item) => item.productId === product.id
          );

          let newItems: CartItem[];

          if (existingItem) {
            // Update quantity if item already exists
            newItems = state.cart.items.map((item) =>
              item.productId === product.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    subtotal: (item.quantity + quantity) * item.unitPrice,
                  }
                : item
            );
          } else {
            // Add new item
            const newItem: CartItem = {
              productId: product.id,
              product,
              quantity,
              unitPrice: product.price,
              subtotal: product.price * quantity,
            };
            newItems = [...state.cart.items, newItem];
          }

          const cart = {
            ...state.cart,
            items: newItems,
          };

          // Recalculate cart totals
          const subtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
          const deliveryFee = subtotal >= cart.freeDeliveryThreshold ? 0 : cart.deliveryFee;
          const total = subtotal + deliveryFee - (cart.discount || 0);

          return {
            cart: {
              ...cart,
              subtotal,
              deliveryFee,
              total,
            },
          };
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const newItems = state.cart.items.filter(
            (item) => item.productId !== productId
          );

          const subtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
          const deliveryFee = subtotal >= state.cart.freeDeliveryThreshold ? 0 : state.cart.deliveryFee;
          const total = subtotal + deliveryFee - (state.cart.discount || 0);

          return {
            cart: {
              ...state.cart,
              items: newItems,
              subtotal,
              deliveryFee,
              total,
            },
          };
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const newItems = state.cart.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity,
                  subtotal: quantity * item.unitPrice,
                }
              : item
          );

          const subtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
          const deliveryFee = subtotal >= state.cart.freeDeliveryThreshold ? 0 : state.cart.deliveryFee;
          const total = subtotal + deliveryFee - (state.cart.discount || 0);

          return {
            cart: {
              ...state.cart,
              items: newItems,
              subtotal,
              deliveryFee,
              total,
            },
          };
        });
      },

      clearCart: () => {
        set({ cart: initialCart });
      },

      setDeliveryFee: (fee) => {
        set((state) => {
          const deliveryFee = state.cart.subtotal >= state.cart.freeDeliveryThreshold ? 0 : fee;
          const total = state.cart.subtotal + deliveryFee - (state.cart.discount || 0);

          return {
            cart: {
              ...state.cart,
              deliveryFee,
              total,
            },
          };
        });
      },

      setFreeDeliveryThreshold: (threshold) => {
        set((state) => {
          const deliveryFee = state.cart.subtotal >= threshold ? 0 : state.cart.deliveryFee;
          const total = state.cart.subtotal + deliveryFee - (state.cart.discount || 0);

          return {
            cart: {
              ...state.cart,
              freeDeliveryThreshold: threshold,
              deliveryFee,
              total,
            },
          };
        });
      },

      setDiscount: (discount) => {
        set((state) => {
          const total = state.cart.subtotal + state.cart.deliveryFee - discount;

          return {
            cart: {
              ...state.cart,
              discount,
              total,
            },
          };
        });
      },

      setSelectedAddressId: (addressId) => {
        set((state) => ({
          cart: {
            ...state.cart,
            selectedAddressId: addressId,
          },
        }));
      },

      getItemQuantity: (productId) => {
        const item = get().cart.items.find((item) => item.productId === productId);
        return item?.quantity || 0;
      },

      getCartItemCount: () => {
        return get().cart.items.reduce((count, item) => count + item.quantity, 0);
      },

      calculateCart: () => {
        set((state) => {
          const subtotal = state.cart.items.reduce((sum, item) => sum + item.subtotal, 0);
          const deliveryFee = subtotal >= state.cart.freeDeliveryThreshold ? 0 : state.cart.deliveryFee;
          const total = subtotal + deliveryFee - (state.cart.discount || 0);

          return {
            cart: {
              ...state.cart,
              subtotal,
              deliveryFee,
              total,
            },
          };
        });
      },
    }),
    {
      name: 'grabber-cart-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

