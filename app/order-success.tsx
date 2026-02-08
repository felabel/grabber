/**
 * Order Success Screen
 *
 * Confirmation after placing an order. Shows success state and CTAs.
 * Route: /order-success?id={orderId}
 */

import { theme } from '@/constants/theme';
import { getOrderById } from '@/data/orders';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderSuccessScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const order = id ? getOrderById(id) : undefined;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Feather name="check-circle" size={80} color={theme.colors.primary[500]} />
        </View>
        <Text style={styles.title}>Order placed successfully</Text>
        <Text style={styles.subtitle}>
          Thank you for your order. We’ll notify you when it’s on its way.
        </Text>
        {order && (
          <View style={styles.orderBadge}>
            <Text style={styles.orderLabel}>Order number</Text>
            <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          </View>
        )}

        <View style={styles.actions}>
          {order && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.replace(`/order-details?id=${order.id}`)}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>View order</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)/home')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Continue shopping</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.replace('/orders')}
          >
            <Text style={styles.linkButtonText}>View all orders</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['3xl'],
    alignItems: 'center',
  },
  iconWrap: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.dark,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
  },
  orderBadge: {
    backgroundColor: theme.colors.background.secondary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
    minWidth: 200,
    alignItems: 'center',
  },
  orderLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.dark,
  },
  actions: {
    width: '100%',
    gap: theme.spacing.md,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  secondaryButton: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  secondaryButtonText: {
    color: theme.colors.text.dark,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  linkButton: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  linkButtonText: {
    color: theme.colors.primary[500],
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
});
