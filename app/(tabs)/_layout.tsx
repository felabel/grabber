/**
 * Tabs Layout
 * Bottom tab navigator with active green border and floating cart above the tab bar.
 * Favourites, Search, Profile, Menu show a back (arrow) that goes to Home.
 */
import { FloatingCart } from '@/components/cart';
import { TabBarWithActiveIndicator } from '@/components/navigation/TabBarWithActiveIndicator';
import { useCartStore } from '@/store';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Tabs, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const FLOATING_CART_HEIGHT = 56 + 8; // bar height + margin
const TAB_BAR_HEIGHT = 56;

function BackToHomeButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.replace('/(tabs)/home')}
      style={{ marginLeft: 8, padding: 8 }}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <Feather name="arrow-left" size={24} color="#0A0B0A" />
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  const cartItemCount = useCartStore((state) => state.getCartItemCount());

  const backHeaderLeft = () => <BackToHomeButton />;

  return (
    <Tabs
      tabBar={(props) => (
        <View style={styles.tabBarWrapper} pointerEvents="box-none">
          <View
            style={[
              styles.floatingCartWrapper,
              cartItemCount === 0 && styles.floatingCartWrapperEmpty,
            ]}
            pointerEvents="box-none"
          >
            <FloatingCart />
          </View>
          <TabBarWithActiveIndicator {...props} />
        </View>
      )}
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#0CA201',
        tabBarInactiveTintColor: '#0A0B0A',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favourites',
          tabBarLabel: 'Favourites',
          headerLeft: backHeaderLeft,
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarLabel: 'Search',
          headerLeft: backHeaderLeft,
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          headerLeft: backHeaderLeft,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarLabel: 'Menu',
          headerLeft: backHeaderLeft,
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="menu" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'relative',
    overflow: 'visible',
    minHeight: FLOATING_CART_HEIGHT + TAB_BAR_HEIGHT,
    justifyContent: 'flex-end',
  },
  floatingCartWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: TAB_BAR_HEIGHT,
    height: FLOATING_CART_HEIGHT,
  },
  floatingCartWrapperEmpty: {
    height: 0,
    overflow: 'hidden',
  },
});

