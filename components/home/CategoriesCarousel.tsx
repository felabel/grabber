/**
 * Categories Carousel Component
 * Horizontal scrolling categories with icons.
 * SVGs are rendered as components (expo-image source does not support SVG).
 */

import { theme } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FruitsSvg = require('@/assets/images/fruits.svg').default;
const MilkEggSvg = require('@/assets/images/milk-egg.svg').default;
const BeveragesSvg = require('@/assets/images/beverages.svg').default;
const LaundrySvg = require('@/assets/images/laundry.svg').default;
const VegetablesSvg = require('@/assets/images/vegrtables.svg').default;

interface Category {
  id: string;
  name: string;
  SvgIcon: React.ComponentType<{ width?: number; height?: number }>;
}

interface CategoriesCarouselProps {
  categories?: Category[];
  onCategoryPress?: (categoryId: string) => void;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Fruits', SvgIcon: FruitsSvg },
  { id: '2', name: 'Milk & egg', SvgIcon: MilkEggSvg },
  { id: '3', name: 'Beverages', SvgIcon: BeveragesSvg },
  { id: '4', name: 'Laundry', SvgIcon: LaundrySvg },
  { id: '5', name: 'Vegetables', SvgIcon: VegetablesSvg },
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
              {React.createElement(category.SvgIcon, { width: 50, height: 50 })}
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

