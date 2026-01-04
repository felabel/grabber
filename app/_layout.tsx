/**
 * Root Layout
 * 
 * Main app layout with providers and navigation setup.
 * Includes:
 * - React Query provider for server state
 * - Safe area context for device insets
 * - Gesture handler root for animations
 * - Splash screen handling
 */

import { QueryProvider } from '@/providers/query-provider';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc. here if needed
        // For now, just add a small delay to ensure splash is visible
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately after the root view renders
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <QueryProvider>
          <View style={styles.container} onLayout={onLayoutRootView}>
            <Stack
              screenOptions={{
                headerShown: false, // Hide default header, we'll use custom headers
                animation: 'slide_from_right',
                contentStyle: { backgroundColor: '#ffffff' },
              }}
            >
              {/* Auth stack - shown when user is not authenticated */}
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              
              {/* Main tabs - shown when user is authenticated */}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              
              {/* Modal/overlay screens */}
              <Stack.Screen
                name="product-details"
                options={{
                  presentation: 'card',
                  headerShown: true,
                  title: 'Product Details',
                }}
              />
              <Stack.Screen
                name="cart"
                options={{
                  presentation: 'card',
                  headerShown: true,
                  title: 'Shopping Cart',
                }}
              />
              <Stack.Screen
                name="checkout"
                options={{
                  presentation: 'card',
                  headerShown: true,
                  title: 'Checkout',
                }}
              />
              <Stack.Screen
                name="order-success"
                options={{
                  presentation: 'card',
                  headerShown: true,
                  title: 'Order Placed',
                }}
              />
              <Stack.Screen
                name="order-details"
                options={{
                  presentation: 'card',
                  headerShown: true,
                  title: 'Order Details',
                }}
              />
              <Stack.Screen
                name="addresses"
                options={{
                  presentation: 'card',
                  headerShown: true,
                  title: 'Addresses',
                }}
              />
              <Stack.Screen
                name="settings"
                options={{
                  presentation: 'card',
                  headerShown: true,
                  title: 'Settings',
                }}
              />
            </Stack>
          </View>
        </QueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});