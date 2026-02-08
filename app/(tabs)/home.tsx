/**
 * Home Screen
 * 
 * Main home screen that renders home components
 */

import {
    CategoriesCarousel,
    FruitsListingSection,
    HeaderSection,
    HeroSlider,
} from '@/components/home';
import { useCartStore } from '@/store';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FLOATING_CART_HEIGHT = 56 + 8; // bar height + margin

export default function HomeScreen() {
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.getCartItemCount());

  const handleLocationPress = () => {
    // TODO: Navigate to location selection
  };

  const handleCartPress = () => {
    router.push('/cart');
  };

  const handleSlidePress = (_slideId: string) => {
    router.push('/(tabs)/search');
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const handleSeeAllPress = () => {
    // TODO: Navigate to all fruits/products
  };

  const handleFruitPress = (fruitId: string) => {
    router.push(`/product-details?id=${fruitId}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HeaderSection onLocationPress={handleLocationPress} onCartPress={handleCartPress} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          cartItemCount > 0 && { paddingBottom: 20 + FLOATING_CART_HEIGHT },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <HeroSlider onSlidePress={handleSlidePress} />
        <CategoriesCarousel onCategoryPress={handleCategoryPress} />
        <FruitsListingSection
          onSeeAllPress={handleSeeAllPress}
          onFruitPress={handleFruitPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
