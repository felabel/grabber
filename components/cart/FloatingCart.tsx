/**
 * Floating Cart Component
 * Fixed bar above the tab bar: scrollable item thumbnails (using project images),
 * separator, "View Basket" + icon + count badge.
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

const {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} = theme;

const THUMB_SIZE = 40;
const BAR_HEIGHT = 56;
const HORIZONTAL_PADDING = spacing.md;
const BADGE_SIZE = 20;

export default function FloatingCart() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const itemCount = useCartStore((state) => state.getCartItemCount());

  const items = cart.items;

  const handlePress = () => {
    router.push('/cart');
  };

  if (itemCount === 0) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={styles.container}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbnailsContent}
        style={styles.thumbnailsScroll}
      >
        {items.map((item) => {
          const SvgComponent = getProductImageComponent(item.product.name);
          return (
            <View key={item.productId} style={styles.thumbWrapper}>
              {item.product.imageUrl ? (
                <Image
                  source={{ uri: item.product.imageUrl }}
                  style={styles.thumb}
                />
              ) : (
                <View style={styles.thumbSvg}>
                  {React.createElement(SvgComponent, {
                    width: THUMB_SIZE,
                    height: THUMB_SIZE,
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* <View style={styles.separator} /> */}

      <View style={styles.viewBasketRow}>
        <Text style={styles.viewBasketText}>View Basket</Text>
        <View style={styles.iconBadgeWrap}>
          <Feather name="shopping-bag" size={22} color={colors.white} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{itemCount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: BAR_HEIGHT,
    backgroundColor: colors.primary[500],
    marginHorizontal: HORIZONTAL_PADDING,
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
    paddingRight: spacing.md,
    borderRadius: borderRadius.md,
    // position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    zIndex: 1000,
    ...shadows.md,
  },
  thumbnailsScroll: {
    flexGrow: 0,
    maxWidth: '55%',
  },
  thumbnailsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: (BAR_HEIGHT - THUMB_SIZE) / 2,
  },
  thumbWrapper: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  thumbSvg: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: colors.white,
    opacity: 0.8,
    marginHorizontal: spacing.sm,
  },
  viewBasketRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  viewBasketText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  iconBadgeWrap: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    backgroundColor: colors.error[500],
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
});
