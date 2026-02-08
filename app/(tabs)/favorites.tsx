/**
 * Favorites Screen
 *
 * Empty state when no favourites; grid of favourited products with heart (remove) and add to cart.
 */

import { theme } from '@/constants/theme';
import {
    getProductById,
    getProductSvg,
} from '@/data/category-products';
import { useCartStore, useFavoritesStore } from '@/store';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FLOATING_CART_HEIGHT = 56 + 8;

function EmptyFavourites({ onBrowse }: { onBrowse: () => void }) {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconWrap}>
        <Feather name="heart" size={64} color={theme.colors.text.muted} />
      </View>
      <Text style={styles.emptyTitle}>No favourites yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the heart on products to add them here
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={onBrowse}
        activeOpacity={0.8}
      >
        <Text style={styles.browseButtonText}>Browse products</Text>
      </TouchableOpacity>
    </View>
  );
}

function FavouriteProductCard({
  productId,
  onRemove,
  onAddToCart,
  onPress,
}: {
  productId: string;
  onRemove: () => void;
  onAddToCart: () => void;
  onPress: () => void;
}) {
  const product = getProductById(productId);
  if (!product) return null;

  const SvgImage = getProductSvg(product.name);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.cardImageWrap}>
        {React.createElement(SvgImage, { width: 120, height: 100 })}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Feather name="heart" size={20} color={theme.colors.error[500]} fill={theme.colors.error[500]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cardName} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.cardPrice}>${product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

export default function FavoritesScreen() {
  const router = useRouter();
  const productIds = useFavoritesStore((state) => state.productIds);
  const removeFavorite = useFavoritesStore((state) => state.remove);
  const addToCart = useCartStore((state) => state.addItem);

  const handleBrowse = () => router.push('/(tabs)/home');

  const products = productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p != null);

  const handleAddToCart = (productId: string) => {
    const product = getProductById(productId);
    if (product) addToCart(product, 1);
  };

  if (products.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyFavourites onBrowse={handleBrowse} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: 24 + FLOATING_CART_HEIGHT },
        ]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FavouriteProductCard
            productId={item.id}
            onRemove={() => removeFavorite(item.id)}
            onAddToCart={() => handleAddToCart(item.id)}
            onPress={() => router.push(`/product-details?id=${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyIconWrap: {
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.dark,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  browseButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
  },
  browseButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  card: {
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  cardImageWrap: {
    position: 'relative',
    height: 100,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heartButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    padding: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.dark,
  },
  cardName: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text.dark,
    marginBottom: 2,
  },
  cardPrice: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.dark,
  },
});
