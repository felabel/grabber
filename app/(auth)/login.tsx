/**
 * Login Screen
 * 
 * User authentication screen.
 * TODO: Implement login form UI and authentication logic
 */

import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Login Screen - UI to be implemented</Text>
      {/* Dev bypass: same entry as index.tsx so Android/Expo Go route restore matches home */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.replace('/(tabs)/home')}
      >
        <Text style={styles.continueButtonText}>Continue to app</Text>
      </TouchableOpacity>
      {/* 
        TODO: Add login form with:
        - Email input
        - Password input
        - Login button
        - Link to register screen
        - Link to forgot password screen
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#0CA201',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

