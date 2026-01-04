/**
 * API Endpoints
 * 
 * Centralized endpoint definitions for all API routes.
 * This keeps endpoint paths consistent and easy to update.
 */

export const endpoints = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
  },

  // User endpoints
  user: {
    profile: '/user/profile',
    updateProfile: '/user/profile',
    addresses: '/user/addresses',
    address: (id: string) => `/user/addresses/${id}`,
    paymentMethods: '/user/payment-methods',
    paymentMethod: (id: string) => `/user/payment-methods/${id}`,
    preferences: '/user/preferences',
  },

  // Product endpoints
  products: {
    list: '/products',
    search: '/products/search',
    byId: (id: string) => `/products/${id}`,
    byCategory: (categoryId: string) => `/products/category/${categoryId}`,
    featured: '/products/featured',
    popular: '/products/popular',
  },

  // Category endpoints
  categories: {
    list: '/categories',
    byId: (id: string) => `/categories/${id}`,
  },

  // Cart endpoints (if server-side cart is needed)
  cart: {
    get: '/cart',
    addItem: '/cart/items',
    updateItem: (itemId: string) => `/cart/items/${itemId}`,
    removeItem: (itemId: string) => `/cart/items/${itemId}`,
    clear: '/cart',
  },

  // Order endpoints
  orders: {
    list: '/orders',
    byId: (id: string) => `/orders/${id}`,
    create: '/orders',
    cancel: (id: string) => `/orders/${id}/cancel`,
    track: (id: string) => `/orders/${id}/track`,
  },

  // Favorites endpoints
  favorites: {
    list: '/favorites',
    add: '/favorites',
    remove: (productId: string) => `/favorites/${productId}`,
    toggle: (productId: string) => `/favorites/${productId}/toggle`,
  },
} as const;

