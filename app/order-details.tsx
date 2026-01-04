/**
 * Order Details Screen
 * 
 * Individual order details and tracking.
 * 
 * Route: /order-details?id={orderId}
 * 
 * TODO: Implement order details UI
 */

import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScrollView>
      <View>
        <Text>Order Details Screen - UI to be implemented</Text>
        <Text>Order ID: {id}</Text>
        {/* 
          TODO: Add:
          - Order status indicator with timeline
          - Order items list
          - Delivery address
          - Payment method
          - Order summary (subtotal, delivery, total)
          - Cancel order button (if applicable)
          - Reorder button
          - Contact support button
        */}
      </View>
    </ScrollView>
  );
}

