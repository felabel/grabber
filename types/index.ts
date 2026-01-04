/**
 * Core TypeScript types and interfaces for Grabber app
 */

// ============================================================================
// PRODUCT TYPES
// ============================================================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For showing discounts
  imageUrl: string;
  images?: string[]; // Multiple images for product details
  categoryId: string;
  categoryName?: string;
  unit?: string; // e.g., "kg", "piece", "pack"
  inStock: boolean;
  stockQuantity?: number;
  rating?: number;
  reviewCount?: number;
  isFavorite?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  icon?: string;
  productCount?: number;
  parentCategoryId?: string; // For nested categories
  order?: number; // For custom sorting
}

// ============================================================================
// CART TYPES
// ============================================================================

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number; // Price at time of adding to cart
  subtotal: number; // quantity * unitPrice
}

export interface Cart {
  items: CartItem[];
  subtotal: number; // Sum of all item subtotals
  deliveryFee: number;
  freeDeliveryThreshold: number;
  discount?: number;
  total: number; // subtotal + deliveryFee - discount
  selectedAddressId?: string;
}

// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  addresses: Address[];
  paymentMethods?: PaymentMethod[];
  preferences?: UserPreferences;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
  instructions?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'wallet' | 'cod';
  last4?: string; // For cards
  brand?: string; // e.g., "Visa", "Mastercard"
  isDefault: boolean;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    deliveryAlerts: boolean;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ============================================================================
// ORDER TYPES
// ============================================================================

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  estimatedDeliveryTime?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// ============================================================================
// APP STATE TYPES
// ============================================================================

export interface AppState {
  selectedLocation?: {
    addressId: string;
    address: Address;
  };
  deliveryFee: number;
  freeDeliveryThreshold: number;
  isOnline: boolean;
  appVersion: string;
}

// ============================================================================
// API TYPES
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

// ============================================================================
// SEARCH & FILTER TYPES
// ============================================================================

export interface SearchFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'rating' | 'newest';
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export type RootStackParamList = {
  '(auth)': undefined;
  '(tabs)': undefined;
  'product-details': { productId: string };
  'cart': undefined;
  'checkout': undefined;
  'order-success': { orderId: string };
  'order-details': { orderId: string };
  'addresses': undefined;
  'settings': undefined;
};

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
  'forgot-password': undefined;
};

export type TabsStackParamList = {
  home: undefined;
  categories: undefined;
  search: undefined;
  favorites: undefined;
  profile: undefined;
};

