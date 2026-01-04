/**
 * Orders List Screen
 * 
 * User's order history.
 * TODO: Implement orders list UI
 */

import { View, Text, ScrollView } from 'react-native';

export default function OrdersScreen() {
  return (
    <ScrollView>
      <View>
        <Text>Orders Screen - UI to be implemented</Text>
        {/* 
          TODO: Add:
          - Filter by status (All, Pending, Delivered, Cancelled)
          - Orders list with status indicators
          - Navigation to order details
          - Empty state when no orders
        */}
      </View>
    </ScrollView>
  );
}

