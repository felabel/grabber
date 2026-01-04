/**
 * Order Success Screen
 * 
 * Confirmation screen after successful order placement.
 * 
 * Route: /order-success?id={orderId}
 * 
 * TODO: Implement order success UI
 */

import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function OrderSuccessScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Order Success Screen - UI to be implemented</Text>
      <Text>Order ID: {id}</Text>
      {/* 
        TODO: Add:
        - Success animation/icon
        - Order number
        - Estimated delivery time
        - Order summary
        - Track order button
        - Continue shopping button
      */}
    </View>
  );
}

