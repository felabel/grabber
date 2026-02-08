/**
 * Checkout Screen
 *
 * Delivery options, order summary, payment method, Place Order.
 */

import { theme } from '@/constants/theme';
import { useCartStore } from '@/store';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { colors, spacing, borderRadius, typography } = theme;

const BAG_FEE = 0.25;
const SERVICE_FEE = 5.25;

type DeliveryOption = 'priority' | 'standard' | 'schedule';

export default function CheckoutScreen() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('priority');
  const [requestInvoice, setRequestInvoice] = useState(false);

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryDisplay = cart.deliveryFee === 0 ? 0 : cart.deliveryFee;
  const totalWithFees =
    cart.subtotal + BAG_FEE + SERVICE_FEE + deliveryDisplay - (cart.discount ?? 0);

  const handlePlaceOrder = () => {
    router.replace('/order-success');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery options */}
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Delivery</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.deliveryRow}
            onPress={() => setDeliveryOption('priority')}
          >
            <View style={styles.deliveryLabel}>
              <Feather name="zap" size={20} color={colors.primary[500]} />
              <Text style={styles.deliveryText}>Priority (10 – 20 mins)</Text>
            </View>
            {deliveryOption === 'priority' && (
              <Feather name="check-circle" size={24} color={colors.primary[500]} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deliveryRow}
            onPress={() => setDeliveryOption('standard')}
          >
            <View style={styles.deliveryLabel}>
              <Feather name="file-text" size={20} color={colors.text.secondary} />
              <Text style={styles.deliveryText}>Standard (30 – 45 mins)</Text>
            </View>
            {deliveryOption === 'standard' && (
              <Feather name="check-circle" size={24} color={colors.primary[500]} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.deliveryRow, styles.deliveryRowLast]}
            onPress={() => setDeliveryOption('schedule')}
          >
            <View style={styles.deliveryLabel}>
              <Feather name="clock" size={20} color={colors.text.secondary} />
              <Text style={styles.deliveryText}>Schedule</Text>
            </View>
            <Feather name="chevron-right" size={22} color={colors.text.muted} />
          </TouchableOpacity>
        </View>

        {/* Order summary */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.card}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Order Summary ({itemCount} items)</Text>
            <Feather name="chevron-right" size={22} color={colors.text.muted} />
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${cart.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Bag fee</Text>
            <Text style={styles.summaryValue}>${BAG_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service fee</Text>
            <Text style={styles.summaryValue}>${SERVICE_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>
              {deliveryDisplay === 0 ? '$0.00' : `$${deliveryDisplay.toFixed(2)}`}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalWithFees.toFixed(2)}</Text>
          </View>
        </View>

        {/* Request invoice */}
        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceLabel}>Request an invoice</Text>
          <Switch
            value={requestInvoice}
            onValueChange={setRequestInvoice}
            trackColor={{ false: colors.border.default, true: colors.primary[200] }}
            thumbColor={requestInvoice ? colors.primary[500] : colors.white}
          />
        </View>

        {/* Payment method */}
        <Text style={styles.sectionTitle}>Payment method</Text>
        <TouchableOpacity style={styles.card}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentText}>Apple Pay</Text>
            <Feather name="chevron-right" size={22} color={colors.text.muted} />
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.9}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  deliveryLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  deliveryText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  deliveryRowLast: {
    borderBottomWidth: 0,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  totalRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  totalLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[500],
  },
  invoiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: spacing.md,
    marginTop: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  invoiceLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    paddingBottom: spacing.lg + 34,
    backgroundColor: colors.background.secondary,
  },
  placeOrderButton: {
    height: 56,
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
});
