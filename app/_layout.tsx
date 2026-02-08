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

import { getCategoryName } from '@/data/category-products';
import { QueryProvider } from '@/providers/query-provider';
import Feather from '@expo/vector-icons/Feather';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function CartOrdersButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push('/orders')}
      style={{ marginRight: 16 }}
    >
      <Feather name="file-text" size={22} color="#0A0B0A" />
    </TouchableOpacity>
  );
}

/** Single left arrow only – no background, no radius (same as Search tab back icon) */
function StackBackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={styles.backButton}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      activeOpacity={0.6}
    >
      <Feather name="arrow-left" size={24} color="#0A0B0A" />
    </TouchableOpacity>
  );
}

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
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: { backgroundColor: '#ffffff' },
                headerLeft: () => <StackBackButton />,
              }}
            >
              {/* Auth stack - shown when user is not authenticated */}
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              
              {/* Main tabs - shown when user is authenticated */}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              
              {/* Modal/overlay screens */}
              <Stack.Screen
                name="category/[id]"
                options={({ route }) => ({
                  presentation: 'card',
                  headerShown: true,
                  title: getCategoryName((route.params as { id?: string })?.id ?? ''),
                })}
              />
              <Stack.Screen
                name="product-details"
                options={{
                  presentation: 'card',
                  headerShown: true,
                  title: 'Product Details',
                }}
              />
              <Stack.Screen
                name="orders"
                options={{
                  presentation: 'card',
                  headerShown: true,
                  title: 'Orders',
                }}
              />
              <Stack.Screen
                name="cart"
                options={{
                  presentation: 'card',
                  headerShown: true,
                  title: 'Cart',
                  headerRight: () => <CartOrdersButton />,
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
  backButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
});