/**
 * Cart Screen
 *
 * Shopping cart with items, quantity controls, and Go to checkout.
 */

import { theme } from '@/constants/theme';
import { useCartStore } from '@/store';
import { getProductImageComponent } from '@/utils/product-images';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { colors, spacing, borderRadius, typography, shadows } = theme;

const CART_ITEM_IMAGE_WIDTH = 114;
const CART_ITEM_IMAGE_HEIGHT = 114;
const CHECKOUT_BUTTON_HEIGHT = 56;
const CARD_BG = '#F9F9F9';

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeItem } = useCartStore();
  const items = cart.items;

  const handleGoToCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add items from the home screen</Text>
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.emptyButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => {
          const SvgComponent = getProductImageComponent(item.product.name);
          return (
            <View key={item.productId} style={styles.itemCard}>
              <View style={styles.itemImageWrap}>
                {item.product.imageUrl ? (
                  <Image
                    source={{ uri: item.product.imageUrl }}
                    style={styles.itemImage}
                  />
                ) : (
                  <View style={styles.itemSvg}>
                    {React.createElement(SvgComponent, {
                      width: CART_ITEM_IMAGE_WIDTH,
                      height: CART_ITEM_IMAGE_HEIGHT,
                    })}
                  </View>
                )}
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.product.name}
                </Text>
                <Text style={styles.itemPrice}>
                  ${item.unitPrice.toFixed(2)}
                </Text>
                <View style={styles.quantityPill}>
                  <TouchableOpacity
                    onPress={() =>
                      item.quantity === 1
                        ? removeItem(item.productId)
                        : updateQuantity(item.productId, item.quantity - 1)
                    }
                    style={styles.quantityPillSegment}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  >
                    <Feather
                      name={item.quantity === 1 ? 'trash-2' : 'minus'}
                      size={18}
                      color={colors.text.dark}
                    />
                  </TouchableOpacity>
                  <View style={styles.quantityPillSegment}>
                    <Text style={styles.quantityPillText}>{item.quantity}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.productId, item.quantity + 1)}
                    style={styles.quantityPillSegment}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  >
                    <Feather name="plus" size={18} color={colors.text.black} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleGoToCheckout}
          activeOpacity={0.9}
        >
          <Text style={styles.checkoutButtonText}>Go to checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: CHECKOUT_BUTTON_HEIGHT + spacing.lg,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: "white",
    borderRadius: borderRadius.md,
    // padding: 12,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  itemImageWrap: {
    width: CART_ITEM_IMAGE_WIDTH,
    height: CART_ITEM_IMAGE_HEIGHT,
    borderTopLeftRadius: borderRadius.md,
    borderBottomLeftRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: '#F6F6F6',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemSvg: {
    width: CART_ITEM_IMAGE_WIDTH,
    height: CART_ITEM_IMAGE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },
  itemPrice: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
    marginTop: 2,
  },
  quantityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: colors.white,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.border.neutral,
    overflow: 'hidden',
    marginBottom: 12,
    marginRight: 12,
  },
  quantityPillSegment: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityPillDivider: {
    width: 1,
    height: 18,
    backgroundColor: colors.border.light,
  },
  quantityPillText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.dark,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    paddingBottom: spacing.lg + 34,
    backgroundColor: colors.background.primary,
  },
  checkoutButton: {
    height: CHECKOUT_BUTTON_HEIGHT,
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.muted,
    marginBottom: spacing.lg,
  },
  emptyButton: {
    backgroundColor: colors.primary[500],
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: borderRadius.lg,
  },
  emptyButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.white,
  },
});
