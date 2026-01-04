/**
 * Design tokens for Grabber app
 * 
 * This file contains all design system tokens including colors, typography,
 * spacing, and border radius values. These tokens should be used throughout
 * the app for consistent styling.
 */

// ============================================================================
// BRAND COLORS (Green-based grocery brand)
// ============================================================================

export const colors = {
  // Primary brand colors
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#0CA201', // Main primary color - brand green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Primary green (light) - for slider backgrounds
  primaryGreen: '#D7FFD4',

  // Secondary brand color (yellow)
  secondary: '#FFDB24',


  // Success color
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },

  // Error color
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },

  // Warning color
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },

  // Info color
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },

  // Text colors
  text: {
    primary: '#1f2937', // Dark gray for primary text
    secondary: '#6b7280', // Medium gray for secondary text
    muted: '#9ca3af', // Light gray for muted/disabled text
    inverse: '#ffffff', // White text for dark backgrounds
    link: '#22c55e', // Primary color for links
  },

  // Background colors
  background: {
    primary: '#ffffff', // White background
    secondary: '#f9fafb', // Light gray background
    tertiary: '#f3f4f6', // Slightly darker gray
    inverse: '#1f2937', // Dark background
    overlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },

  // Border colors
  border: {
    light: '#e5e7eb',
    default: '#d1d5db',
    dark: '#9ca3af',
  },

  // Status colors for order status
  status: {
    pending: '#f59e0b',
    confirmed: '#3b82f6',
    preparing: '#8b5cf6',
    out_for_delivery: '#6366f1',
    delivered: '#22c55e',
    cancelled: '#ef4444',
  },
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fontFamily: {
    regular: 'System', // Will be updated when custom fonts are added
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  pill: 9999, // For fully rounded elements
  full: 9999, // Alias for pill
} as const;

// ============================================================================
// SHADOWS (for elevation)
// ============================================================================

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // Android
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================

export const layout = {
  containerPadding: spacing.md,
  screenPadding: spacing.md,
  headerHeight: 56,
  tabBarHeight: 60,
  buttonHeight: {
    sm: 36,
    md: 44,
    lg: 52,
  },
  inputHeight: {
    sm: 40,
    md: 48,
    lg: 56,
  },
} as const;

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

export const animation = {
  fast: 150,
  normal: 250,
  slow: 350,
} as const;

// ============================================================================
// EXPORT THEME OBJECT
// ============================================================================

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
  animation,
} as const;

export type Theme = typeof theme;

