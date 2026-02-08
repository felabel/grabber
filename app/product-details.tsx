/**
 * Product Details Screen
 *
 * Gallery, description, reviews, quantity, Add to cart, favourite heart.
 * Route: /product-details?id={productId}
 */

import { theme } from '@/constants/theme';
import {
    getProductById,
    getProductSvg,
} from '@/data/category-products';
import { useCartStore, useFavoritesStore } from '@/store';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_REVIEWS = [
  { author: 'Sarah M.', text: 'Fresh and exactly as described. Will order again!', date: '2 days ago', rating: 5 },
  { author: 'James K.', text: 'Good quality. Delivery was fast.', date: '1 week ago', rating: 4 },
  { author: 'Emma L.', text: 'Love it. Great value for money.', date: '2 weeks ago', rating: 5 },
];

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const product = id ? getProductById(id) : undefined;

  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((state) => state.toggle);
  const isFavorite = useFavoritesStore((state) =>
    id ? state.isFavorite(id) : false
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Product not found</Text>
          <TouchableOpacity
            style={styles.backLink}
            onPress={() => router.back()}
          >
            <Text style={styles.backLinkText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const SvgImage = getProductSvg(product.name);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push('/cart');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gallery}>
          <View style={styles.imageWrap}>
            {React.createElement(SvgImage, { width: 280, height: 220 })}
          </View>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleFavorite(product.id)}
          >
            <Feather
              name="heart"
              size={24}
              color={theme.colors.error[500]}
              fill={isFavorite ? theme.colors.error[500] : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.ratingText}>
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.unit && (
              <Text style={styles.unit}>Per {product.unit}</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {MOCK_REVIEWS.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <Text style={styles.reviewAuthor}>{review.author}</Text>
              <Text style={styles.reviewText}>{review.text}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
              <View style={styles.reviewStars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Text
                    key={i}
                    style={styles.starSmall}
                  >
                    {i < review.rating ? '★' : '☆'}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Text style={styles.quantityBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => setQuantity((q) => q + 1)}
            >
              <Text style={styles.quantityBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  backLink: {
    padding: theme.spacing.md,
  },
  backLinkText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary[500],
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  gallery: {
    position: 'relative',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.background.secondary,
  },
  imageWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
  },
  heartButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    padding: 8,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  productName: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.dark,
    marginBottom: theme.spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  star: {
    fontSize: 16,
    marginRight: 6,
  },
  ratingText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  price: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary[500],
  },
  unit: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.dark,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },
  reviewCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  reviewAuthor: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text.dark,
    marginBottom: 4,
  },
  reviewText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.muted,
    marginBottom: 4,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  starSmall: {
    fontSize: 12,
    color: theme.colors.warning[500],
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  quantityLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text.dark,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  quantityBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBtnText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.dark,
  },
  quantityValue: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text.dark,
    minWidth: 24,
    textAlign: 'center',
  },
  addToCartButton: {
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  addToCartText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
});
