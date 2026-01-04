/**
 * Tabs Layout
 * 
 * Bottom tab navigator for main app screens.
 * Tabs: Home, Favourites, Search, Profile, Menu
 */

import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#22c55e', // Primary green color
        tabBarInactiveTintColor: '#9ca3af', // Muted text color
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
          headerShown: false, // Using custom header in home screen
          // TODO: Add tab bar icon
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favourites',
          tabBarLabel: 'Favourites',
          // TODO: Add tab bar icon
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarLabel: 'Search',
          // TODO: Add tab bar icon
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          // TODO: Add tab bar icon
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarLabel: 'Menu',
          // TODO: Add tab bar icon
        }}
      />
    </Tabs>
  );
}

