/**
 * Cart Screen
 * 
 * Shopping cart with items, quantities, and totals.
 * TODO: Implement cart UI
 */

import { View, Text, ScrollView } from 'react-native';
import { useCartStore } from '@/store';

export default function CartScreen() {
  const cart = useCartStore((state) => state.cart);

  return (
    <ScrollView>
      <View>
        <Text>Cart Screen - UI to be implemented</Text>
        {/* 
          TODO: Add:
          - Cart items list with quantity controls
          - Remove item functionality
          - Subtotal, delivery fee, total calculations
          - Free delivery progress indicator
          - Checkout button
          - Empty cart state
          
          Note: Cart bottom sheet logic can be implemented separately
          as a reusable component that uses this same store.
        */}
      </View>
    </ScrollView>
  );
}

