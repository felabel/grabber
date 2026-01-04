/**
 * Categories Carousel Component
 * 
 * Horizontal scrolling categories with icons
 */

import { theme } from '@/constants/theme';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Category {
  id: string;
  name: string;
  image: any;
}

interface CategoriesCarouselProps {
  categories?: Category[];
  onCategoryPress?: (categoryId: string) => void;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Fruits', image: require('@/assets/images/fruits.svg') },
  { id: '2', name: 'Milk & egg', image: require('@/assets/images/milk-egg.svg') },
  { id: '3', name: 'Beverages', image: require('@/assets/images/beverages.svg') },
  { id: '4', name: 'Laundry', image: require('@/assets/images/laundry.svg') },
  { id: '5', name: 'Vegetables', image: require('@/assets/images/vegrtables.svg') },
];

export default function CategoriesCarousel({
  categories = defaultCategories,
  onCategoryPress,
}: CategoriesCarouselProps) {
  const handleCategoryPress = (categoryId: string) => {
    onCategoryPress?.(categoryId);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.id)}
          >
            <View style={styles.categoryIconContainer}>
              <Image 
                source={category.image} 
                style={styles.categoryIcon} 
                contentFit="contain" 
              />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  categoryIconContainer: {
    width: 70,
    height: 70,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  categoryIcon: {
    width: 50,
    height: 50,
  },
  categoryName: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontWeight: theme.typography.fontWeight.medium,
  },
});

