/**
 * Mock order history for Orders screen.
 */

import type { Order } from '@/types';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'GRB-1001',
    userId: 'user-1',
    status: 'delivered',
    items: [
      {
        productId: '1',
        productName: 'Banana',
        productImage: '',
        quantity: 2,
        unitPrice: 3.99,
        subtotal: 7.98,
      },
      {
        productId: '2',
        productName: 'Pepper',
        productImage: '',
        quantity: 1,
        unitPrice: 2.99,
        subtotal: 2.99,
      },
    ],
    subtotal: 10.97,
    deliveryFee: 1.99,
    discount: 0,
    total: 12.96,
    deliveryAddress: {
      id: 'addr-1',
      type: 'home',
      label: 'Home',
      street: '123 Main St',
      city: 'Lagos',
      state: 'Lagos',
      zipCode: '100001',
      country: 'Nigeria',
      isDefault: true,
    },
    paymentMethod: {
      id: 'pay-1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true,
    },
    deliveredAt: '2025-01-20T14:30:00Z',
    createdAt: '2025-01-19T10:00:00Z',
    updatedAt: '2025-01-20T14:30:00Z',
  },
  {
    id: 'ord-2',
    orderNumber: 'GRB-1002',
    userId: 'user-1',
    status: 'out_for_delivery',
    items: [
      {
        productId: '3',
        productName: 'Orange',
        productImage: '',
        quantity: 1,
        unitPrice: 3.99,
        subtotal: 3.99,
      },
      {
        productId: '6',
        productName: 'Milk',
        productImage: '',
        quantity: 2,
        unitPrice: 2.49,
        subtotal: 4.98,
      },
    ],
    subtotal: 8.97,
    deliveryFee: 1.99,
    discount: 0,
    total: 10.96,
    deliveryAddress: {
      id: 'addr-1',
      type: 'home',
      label: 'Home',
      street: '123 Main St',
      city: 'Lagos',
      state: 'Lagos',
      zipCode: '100001',
      country: 'Nigeria',
      isDefault: true,
    },
    paymentMethod: {
      id: 'pay-1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true,
    },
    estimatedDeliveryTime: 'Today by 6 PM',
    createdAt: '2025-01-25T09:15:00Z',
    updatedAt: '2025-01-25T11:00:00Z',
  },
  {
    id: 'ord-3',
    orderNumber: 'GRB-1003',
    userId: 'user-1',
    status: 'preparing',
    items: [
      {
        productId: '4',
        productName: 'Apple',
        productImage: '',
        quantity: 1,
        unitPrice: 4.99,
        subtotal: 4.99,
      },
    ],
    subtotal: 4.99,
    deliveryFee: 1.99,
    discount: 0,
    total: 6.98,
    deliveryAddress: {
      id: 'addr-1',
      type: 'home',
      label: 'Home',
      street: '123 Main St',
      city: 'Lagos',
      state: 'Lagos',
      zipCode: '100001',
      country: 'Nigeria',
      isDefault: true,
    },
    paymentMethod: {
      id: 'pay-1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true,
    },
    estimatedDeliveryTime: 'Tomorrow by 12 PM',
    createdAt: '2025-01-26T08:00:00Z',
    updatedAt: '2025-01-26T08:00:00Z',
  },
];

export function getOrderById(id: string): Order | undefined {
  return MOCK_ORDERS.find((o) => o.id === id);
}

export function getOrdersForUser(_userId: string): Order[] {
  return [...MOCK_ORDERS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
