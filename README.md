# Grabber - Grocery Delivery App

A React Native mobile application for grocery shopping and delivery, built with Expo and TypeScript.

## 📋 Project Overview

Grabber is a modern grocery delivery app that allows users to:
- Browse grocery items by category
- Add/remove items from shopping basket
- View basket summary in a bottom sheet
- Checkout and track delivery orders
- Manage profile, addresses, and order history

## 🏗️ Architecture

### Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript (strict mode)
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand
- **Server State**: TanStack Query (React Query)
- **Styling**: React Native StyleSheet (design tokens approach)

### Why Zustand over Redux Toolkit?

1. **Less Boilerplate**: Zustand requires minimal setup compared to Redux
2. **Better Performance**: Smaller bundle size and faster renders
3. **Simpler API**: Direct hooks usage without connectors or selectors
4. **TypeScript First**: Excellent TypeScript support out of the box
5. **Async Actions**: No middleware needed for async operations
6. **Perfect for React Native**: Optimized for mobile apps

### Why React Query?

1. **Automatic Caching**: Intelligent caching with background sync
2. **Less Code**: Reduces boilerplate for data fetching
3. **Better UX**: Loading states, error handling, and retry logic built-in
4. **DevTools**: Excellent debugging experience
5. **Optimistic Updates**: Easy to implement optimistic UI updates

## 📁 Project Structure

```
grabber/
├── app/                    # Expo Router screens (file-based routing)
│   ├── (auth)/            # Authentication stack
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/            # Main app tabs
│   │   ├── home.tsx
│   │   ├── categories.tsx
│   │   ├── search.tsx
│   │   ├── favorites.tsx
│   │   └── profile.tsx
│   ├── category/[id].tsx  # Dynamic category route
│   ├── product-details.tsx
│   ├── cart.tsx
│   ├── checkout.tsx
│   ├── order-success.tsx
│   ├── order-details.tsx
│   ├── orders.tsx
│   ├── addresses.tsx
│   ├── settings.tsx
│   ├── index.tsx          # Root entry (auth redirect)
│   └── _layout.tsx        # Root layout with providers
├── api/                   # API client and endpoints
│   ├── client.ts          # HTTP client with auth
│   ├── endpoints.ts       # API endpoint definitions
│   └── index.ts
├── components/            # Reusable UI components (to be implemented)
├── constants/             # App constants
│   └── theme.ts           # Design tokens (colors, typography, spacing)
├── config/                # Configuration files
│   └── env.ts             # Environment variables
├── hooks/                 # Custom React hooks
│   └── use-auth.ts        # Authentication hook
├── providers/             # React context providers
│   └── query-provider.tsx # React Query provider
├── store/                 # Zustand stores
│   ├── cart-store.ts      # Shopping cart state
│   ├── user-store.ts      # User/auth state
│   ├── app-store.ts       # Global app state
│   └── index.ts
├── types/                 # TypeScript type definitions
│   └── index.ts           # All app types/interfaces
├── utils/                 # Utility functions
│   └── index.ts           # Helper functions
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## 🧭 Navigation Flow

### Authentication Flow
```
index.tsx (root)
  ├── Not authenticated → (auth)/login
  │   ├── login.tsx
  │   ├── register.tsx
  │   └── forgot-password.tsx
  └── Authenticated → (tabs)/home
```

### Main App Flow
```
(tabs)/home
  ├── Browse products
  ├── Navigate to categories → (tabs)/categories
  ├── Navigate to category products → category/[id]
  ├── View product details → product-details?id={id}
  ├── Add to cart → cart bottom sheet (logic ready)
  └── Search → (tabs)/search

(tabs)/categories
  └── Navigate to category → category/[id]

(tabs)/search
  └── View product → product-details?id={id}

(tabs)/favorites
  └── View product → product-details?id={id}

(tabs)/profile
  ├── View orders → orders.tsx
  ├── View order details → order-details?id={id}
  ├── Manage addresses → addresses.tsx
  └── Settings → settings.tsx

Cart Flow:
cart.tsx → checkout.tsx → order-success?id={id}
```

## 🗄️ State Management

### Cart Store (`store/cart-store.ts`)
Manages shopping cart state:
- Cart items (products, quantities)
- Cart calculations (subtotal, delivery fee, total)
- Cart operations (add, remove, update quantity)
- Persisted to secure storage

### User Store (`store/user-store.ts`)
Manages user authentication and profile:
- User profile data
- Authentication tokens
- Authentication status
- Persisted to secure storage

### App Store (`store/app-store.ts`)
Manages global app state:
- Selected delivery location
- Delivery fee configuration
- App settings
- Network status

## 🎨 Design Tokens

All design tokens are defined in `constants/theme.ts`:

### Colors
- **Primary**: Green-based brand colors (#22c55e)
- **Secondary**: Purple accent colors
- **Semantic**: Success, error, warning, info
- **Text**: Primary, secondary, muted, inverse
- **Background**: Primary, secondary, tertiary, inverse
- **Borders**: Light, default, dark

### Typography
- Font sizes: xs (12px) to 5xl (48px)
- Font weights: regular, medium, semiBold, bold
- Line heights: tight (1.2), normal (1.5), relaxed (1.75)

### Spacing
- Scale: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), 2xl (40px), 3xl (48px), 4xl (64px)

### Border Radius
- sm (4px), md (8px), lg (12px), xl (16px), 2xl (20px), 3xl (24px), pill (9999px)

## 🔌 API Integration

### API Client (`api/client.ts`)
- Centralized HTTP client
- Automatic authentication header injection
- Error handling
- Base URL configuration from environment

### Endpoints (`api/endpoints.ts`)
Centralized endpoint definitions for:
- Authentication (login, register, etc.)
- User profile and addresses
- Products and categories
- Cart (if server-side cart needed)
- Orders
- Favorites

### React Query Integration
- Automatic caching and background refetching
- Loading and error states handled
- Optimistic updates supported
- Configured with sensible defaults (5min stale time, 30min cache time)

## 🔒 Security

- **Secure Storage**: Sensitive data (tokens, cart) stored in Expo SecureStore
- **Token Management**: Access tokens stored securely and automatically included in API requests
- **Environment Variables**: Configurable via app.json extra field or EAS secrets

## 📝 TypeScript Types

Comprehensive type definitions in `types/index.ts`:
- Product and Category types
- Cart and CartItem types
- User, Address, PaymentMethod types
- Order and OrderItem types
- API response types
- Navigation param types

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

   ```bash
# Install dependencies
   npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Environment Setup

Environment variables can be configured in `app.json` under `extra`:
```json
{
  "extra": {
    "apiUrl": "https://api.grabber.app",
    "apiTimeout": "10000",
    "enableLogging": "false",
    "environment": "development"
  }
}
```

For EAS builds, use EAS secrets:
   ```bash
eas secret:create --name EXPO_PUBLIC_API_URL --value https://api.grabber.app
```

## 📱 Screen Status

All screens are set up with placeholders. Ready for UI implementation:
- ✅ Routing structure complete
- ✅ Navigation flows configured
- ✅ State management ready
- ✅ API client setup
- ✅ Type definitions complete
- ⏳ UI components to be implemented

## 🔧 Development Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Start dev server
npm start

# Build for production
eas build --profile production
```

## 📦 Dependencies

### Core
- `expo`: ~54.0.25
- `react-native`: 0.81.5
- `expo-router`: ~6.0.15
- `typescript`: ~5.9.2

### State Management
- `zustand`: ^5.0.2
- `@tanstack/react-query`: ^5.62.11

### Utilities
- `expo-secure-store`: ~14.0.8 (for secure storage)
- `react-native-safe-area-context`: ~5.6.0
- `react-native-gesture-handler`: ~2.28.0

## 🎯 Next Steps

1. **Implement UI Components**: Create reusable components using design tokens
2. **Connect API**: Implement React Query hooks for data fetching
3. **Add Animations**: Use React Native Reanimated for smooth animations
4. **Bottom Sheet**: Implement cart bottom sheet using react-native-bottom-sheet or similar
5. **Image Handling**: Use expo-image for optimized image loading
6. **Push Notifications**: Set up Expo Notifications for order updates
7. **Maps Integration**: Add maps for delivery tracking (if needed)

## 📄 License

Private project - All rights reserved

## 👥 Team

Built with ❤️ for grocery delivery
