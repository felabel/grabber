/**
 * Environment configuration
 * 
 * Loads environment variables from .env files using expo-constants
 * For EAS builds, set environment variables in EAS secrets
 */

import Constants from 'expo-constants';

export const env = {
  apiUrl: Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL || 'https://api.grabber.app',
  apiTimeout: Number(Constants.expoConfig?.extra?.apiTimeout || process.env.EXPO_PUBLIC_API_TIMEOUT || '10000'),
  enableLogging: Constants.expoConfig?.extra?.enableLogging === 'true' || process.env.EXPO_PUBLIC_ENABLE_LOGGING === 'true',
  appVersion: Constants.expoConfig?.version || '1.0.0',
  environment: Constants.expoConfig?.extra?.environment || process.env.EXPO_PUBLIC_ENV || 'development',
} as const;

