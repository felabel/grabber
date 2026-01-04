/**
 * Header Section Component
 * 
 * Displays location selector and shopping cart icon with badge
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCartStore } from '@/store';
import { theme } from '@/constants/theme';

interface HeaderSectionProps {
  location?: string;
  onLocationPress?: () => void;
  onCartPress?: () => void;
}

export default function HeaderSection({
  location = '61 Hopper street..',
  onLocationPress,
  onCartPress,
}: HeaderSectionProps) {
  const cartItemCount = useCartStore((state) => state.getCartItemCount());

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.locationContainer} onPress={onLocationPress}>
        <Text style={styles.locationIcon}>🚚</Text>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.chevronIcon}>▼</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
        <Text style={styles.cartIcon}>🛒</Text>
        {cartItemCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    fontSize: 20,
    marginRight: theme.spacing.xs,
  },
  locationText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.xs,
  },
  chevronIcon: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  cartButton: {
    position: 'relative',
    padding: theme.spacing.xs,
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.pill,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

