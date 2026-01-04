/**
 * Fruits Listing Section Component
 * 
 * Horizontal scrolling product cards for fruits
 */

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { theme } from '@/constants/theme';
import { useCartStore } from '@/store';

interface Fruit {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: any;
}

interface FruitsListingSectionProps {
  title?: string;
  fruits?: Fruit[];
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
  onFruitPress?: (fruitId: string) => void;
}

const defaultFruits: Fruit[] = [
  {
    id: '1',
    name: 'Banana',
    price: 3.99,
    rating: 4.8,
    reviews: 287,
    image: require('@/assets/images/fruits.svg'),
  },
  {
    id: '2',
    name: 'Pepper',
    price: 2.99,
    rating: 4.8,
    reviews: 287,
    image: require('@/assets/images/pepper.svg'),
  },
  {
    id: '3',
    name: 'Orange',
    price: 3.99,
    rating: 4.8,
    reviews: 287,
    image: require('@/assets/images/fruits.svg'),
  },
  {
    id: '4',
    name: 'Apple',
    price: 4.99,
    rating: 4.9,
    reviews: 312,
    image: require('@/assets/images/fruits.svg'),
  },
  {
    id: '5',
    name: 'Mango',
    price: 5.99,
    rating: 4.7,
    reviews: 245,
    image: require('@/assets/images/fruits.svg'),
  },
];

// Repeat fruits for scrolling
const getFruitsList = (fruits: Fruit[], repeatCount: number = 10): Fruit[] => {
  return Array(repeatCount)
    .fill(fruits)
    .flat()
    .map((fruit, index) => ({ ...fruit, id: `${fruit.id}-${index}` }));
};

export default function FruitsListingSection({
  title = 'Fruits',
  fruits = defaultFruits,
  showSeeAll = true,
  onSeeAllPress,
  onFruitPress,
}: FruitsListingSectionProps) {
  const addToCart = useCartStore((state) => state.addItem);

  const fruitsList = getFruitsList(fruits);

  const handleAddToCart = (fruit: Fruit) => {
    // Convert fruit to product format for cart
    const product = {
      id: fruit.id,
      name: fruit.name,
      description: '',
      price: fruit.price, // Price in dollars
      imageUrl: '', // TODO: Add actual image URL
      categoryId: 'fruits',
      inStock: true,
      rating: fruit.rating,
      reviewCount: fruit.reviews,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addToCart(product, 1);
  };

  const handleFruitPress = (fruitId: string) => {
    onFruitPress?.(fruitId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showSeeAll && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.fruitsContainer}
      >
        {fruitsList.map((fruit, index) => (
          <TouchableOpacity
            key={`${fruit.id}-${index}`}
            style={styles.fruitCard}
            onPress={() => handleFruitPress(fruit.id)}
          >
            <View style={styles.fruitImageContainer}>
              <Image 
                source={fruit.image} 
                style={styles.fruitImage} 
                contentFit="cover" 
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(fruit)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.fruitName}>{fruit.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.ratingText}>
                {fruit.rating} ({fruit.reviews})
              </Text>
            </View>
            <Text style={styles.fruitPrice}>${fruit.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  seeAllText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary[500],
    fontWeight: theme.typography.fontWeight.medium,
  },
  fruitsContainer: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  fruitCard: {
    width: 160,
    marginRight: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
    ...theme.shadows.md,
  },
  fruitImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.background.secondary,
  },
  fruitImage: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: theme.spacing.xs,
    right: theme.spacing.xs,
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  },
  fruitName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  fruitPrice: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
});

