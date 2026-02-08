/**
 * Placeholder screen for routes that don't have UI yet.
 * Shows a title, optional subtitle, and a centered Home button to navigate back.
 */

import { theme } from '@/constants/theme';
import Foundation from '@expo/vector-icons/Foundation';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PlaceholderScreenProps {
  title: string;
  subtitle?: string;
}

export function PlaceholderScreen({ title, subtitle }: PlaceholderScreenProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>UI to be implemented</Text>
      {subtitle != null && (
        <Text style={styles.optionalSubtitle}>{subtitle}</Text>
      )}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.replace('/(tabs)/home')}
        activeOpacity={0.8}
      >
        <Foundation name="home" size={24} color={theme.colors.white} />
        <Text style={styles.homeButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: theme.colors.background.primary,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.muted,
    marginBottom: 8,
  },
  optionalSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: 32,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primary[500],
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: theme.borderRadius.lg,
  },
  homeButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.white,
  },
});
