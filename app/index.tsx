/**
 * Root Index Screen
 * 
 * Entry point - temporarily bypassing authentication for development.
 * Redirects directly to home page to access tabs and other screens.
 */

import { Redirect } from 'expo-router';

export default function Index() {
  // Temporarily bypassing authentication - redirect directly to home
  // TODO: Re-enable authentication check later
  // const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  // if (isAuthenticated) {
  //   return <Redirect href="/(tabs)/home" />;
  // }
  // return <Redirect href="/(auth)/login" />;

  return <Redirect href="/(tabs)/home" />;
}
