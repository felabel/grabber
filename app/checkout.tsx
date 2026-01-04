/**
 * Checkout Screen
 * 
 * Order placement screen with:
 * - Delivery address selection
 * - Payment method selection
 * - Order summary
 * - Place order button
 * 
 * TODO: Implement checkout UI
 */

import { View, Text, ScrollView } from 'react-native';
import { useCartStore } from '@/store';

export default function CheckoutScreen() {
  const cart = useCartStore((state) => state.cart);

  return (
    <ScrollView>
      <View>
        <Text>Checkout Screen - UI to be implemented</Text>
        {/* 
          TODO: Add:
          - Delivery address selector
          - Payment method selector
          - Order summary (items, subtotal, delivery, total)
          - Promo code input
          - Place order button
          - Order notes/instructions input
        */}
      </View>
    </ScrollView>
  );
}

