/**
 * Category and product data for category list and product details.
 * Maps category IDs to names and products; provides getProductById.
 */

import type { Product } from '@/types';
import type React from 'react';

const FruitsSvg = require('@/assets/images/fruits.svg').default;
const PepperSvg = require('@/assets/images/pepper.svg').default;

// Category id to name (matches CategoriesCarousel)
export const CATEGORY_NAMES: Record<string, string> = {
  '1': 'Fruits',
  '2': 'Milk & egg',
  '3': 'Beverages',
  '4': 'Laundry',
  '5': 'Vegetables',
};

// Base products used across categories. IDs match home fruit ids and product-details?id=
const baseProducts: Omit<Product, 'createdAt' | 'updatedAt'>[] = [
  {
    id: '1',
    name: 'Banana',
    description: 'Fresh ripe bananas, perfect for snacks and smoothies. Rich in potassium.',
    price: 3.99,
    imageUrl: '',
    categoryId: '1',
    categoryName: 'Fruits',
    unit: 'bunch',
    inStock: true,
    rating: 4.8,
    reviewCount: 287,
  },
  {
    id: '2',
    name: 'Pepper',
    description: 'Colorful bell peppers, great for salads and cooking. Source of vitamin C.',
    price: 2.99,
    imageUrl: '',
    categoryId: '5',
    categoryName: 'Vegetables',
    unit: 'pack',
    inStock: true,
    rating: 4.8,
    reviewCount: 287,
  },
  {
    id: '3',
    name: 'Orange',
    description: 'Sweet and juicy oranges, high in vitamin C.',
    price: 3.99,
    imageUrl: '',
    categoryId: '1',
    categoryName: 'Fruits',
    unit: 'kg',
    inStock: true,
    rating: 4.8,
    reviewCount: 287,
  },
  {
    id: '4',
    name: 'Apple',
    description: 'Crisp apples, great for eating fresh or in pies.',
    price: 4.99,
    imageUrl: '',
    categoryId: '1',
    categoryName: 'Fruits',
    unit: 'kg',
    inStock: true,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: '5',
    name: 'Mango',
    description: 'Tropical mangoes, sweet and fragrant.',
    price: 5.99,
    imageUrl: '',
    categoryId: '1',
    categoryName: 'Fruits',
    unit: 'piece',
    inStock: true,
    rating: 4.7,
    reviewCount: 245,
  },
  // Milk & egg (category 2)
  {
    id: '6',
    name: 'Milk',
    description: 'Fresh whole milk, rich and creamy.',
    price: 2.49,
    imageUrl: '',
    categoryId: '2',
    categoryName: 'Milk & egg',
    unit: 'bottle',
    inStock: true,
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: '7',
    name: 'Eggs',
    description: 'Farm fresh eggs, free range.',
    price: 3.99,
    imageUrl: '',
    categoryId: '2',
    categoryName: 'Milk & egg',
    unit: 'dozen',
    inStock: true,
    rating: 4.7,
    reviewCount: 203,
  },
  // Beverages (category 3)
  {
    id: '8',
    name: 'Orange Juice',
    description: '100% pure orange juice, no added sugar.',
    price: 4.49,
    imageUrl: '',
    categoryId: '3',
    categoryName: 'Beverages',
    unit: 'bottle',
    inStock: true,
    rating: 4.8,
    reviewCount: 312,
  },
  {
    id: '9',
    name: 'Sparkling Water',
    description: 'Refreshing sparkling water, zero calories.',
    price: 1.99,
    imageUrl: '',
    categoryId: '3',
    categoryName: 'Beverages',
    unit: 'pack',
    inStock: true,
    rating: 4.5,
    reviewCount: 189,
  },
  // Laundry (category 4)
  {
    id: '10',
    name: 'Laundry Detergent',
    description: 'Effective detergent for all fabric types.',
    price: 8.99,
    imageUrl: '',
    categoryId: '4',
    categoryName: 'Laundry',
    unit: 'bottle',
    inStock: true,
    rating: 4.6,
    reviewCount: 421,
  },
  {
    id: '11',
    name: 'Fabric Softener',
    description: 'Leaves clothes soft and fresh scented.',
    price: 5.49,
    imageUrl: '',
    categoryId: '4',
    categoryName: 'Laundry',
    unit: 'bottle',
    inStock: true,
    rating: 4.4,
    reviewCount: 278,
  },
];

const now = new Date().toISOString();

function toProduct(p: Omit<Product, 'createdAt' | 'updatedAt'>): Product {
  return {
    ...p,
    createdAt: now,
    updatedAt: now,
  };
}

const allProducts: Product[] = baseProducts.map(toProduct);

/** Get category display name by id */
export function getCategoryName(categoryId: string): string {
  return CATEGORY_NAMES[categoryId] ?? 'Category';
}

/**
 * Normalize product id from home screen (e.g. "1-0", "2-3") to base id ("1", "2").
 * FruitsListingSection uses getFruitsList which creates ids like `${fruit.id}-${index}`.
 */
function toBaseProductId(id: string): string {
  if (!id) return id;
  const base = id.split('-')[0];
  return base ?? id;
}

/** Get product by id (for product details and favourites). Accepts base id or home id (e.g. 1-0). */
export function getProductById(id: string): Product | undefined {
  if (!id) return undefined;
  const baseId = toBaseProductId(id);
  return allProducts.find((p) => p.id === baseId);
}

/** Get all products for a category (for category/[id] grid) */
export function getProductsByCategoryId(categoryId: string): Product[] {
  return allProducts.filter((p) => p.categoryId === categoryId);
}

/** All products (for search or browse) */
export function getAllProducts(): Product[] {
  return [...allProducts];
}

/** SVG component by product name for rendering images */
export const PRODUCT_SVG_MAP: Record<
  string,
  React.ComponentType<{ width?: number; height?: number }>
> = {
  Banana: FruitsSvg,
  Pepper: PepperSvg,
  Orange: FruitsSvg,
  Apple: FruitsSvg,
  Mango: FruitsSvg,
  Milk: FruitsSvg,
  Eggs: FruitsSvg,
  'Orange Juice': FruitsSvg,
  'Sparkling Water': FruitsSvg,
  'Laundry Detergent': FruitsSvg,
  'Fabric Softener': FruitsSvg,
};

export function getProductSvg(
  name: string
): React.ComponentType<{ width?: number; height?: number }> {
  return PRODUCT_SVG_MAP[name] ?? FruitsSvg;
}
