/**
 * Hero Slider Component
 * 
 * Horizontal scrolling slider with promotional banners
 */

import { theme } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - 32; // Account for padding

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  image: any;
}

interface HeroSliderProps {
  slides?: Slide[];
  onSlidePress?: (slideId: string) => void;
}

const defaultSlides: Slide[] = [
  {
    id: '1',
    title: 'Up to 30% offer',
    subtitle: 'Enjoy our big offer',
    buttonText: 'Shop Now',
    backgroundColor: theme.colors.primaryGreen,
    textColor: theme.colors.primary[500],
    buttonColor: theme.colors.primary[500],
    buttonTextColor: '#FFFFFF',
    image: require('@/assets/images/fruit-basket.svg'),
  },
  {
    id: '2',
    title: 'Up to 25% offer',
    subtitle: 'On first buyers',
    buttonText: 'Shop Now',
    backgroundColor: theme.colors.primary[500],
    textColor: '#FFFFFF',
    buttonColor: '#FFFFFF',
    buttonTextColor: '#000000',
    image: require('@/assets/images/fruit-net.svg'),
  },
  {
    id: '3',
    title: 'Get Same day Deliver',
    subtitle: 'On orders above $20',
    buttonText: 'Shop Now',
    backgroundColor: theme.colors.secondary,
    textColor: '#000000',
    buttonColor: '#FFFFFF',
    buttonTextColor: '#000000',
    image: require('@/assets/images/fruit-bag.svg'),
  },
];

export default function HeroSlider({ slides = defaultSlides, onSlidePress }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SLIDER_WIDTH);
    setCurrentIndex(index);
  };

  const handleButtonPress = (slideId: string) => {
    onSlidePress?.(slideId);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.slider}
      >
        {slides.map((slide) => (
          <View
            key={slide.id}
            style={[
              styles.slide,
              { backgroundColor: slide.backgroundColor, width: SLIDER_WIDTH },
            ]}
          >
            <View style={styles.slideContent}>
              <View style={styles.slideTextContainer}>
                <Text style={[styles.slideTitle, { color: slide.textColor }]}>
                  {slide.title}
                </Text>
                <Text style={[styles.slideSubtitle, { color: slide.textColor }]}>
                  {slide.subtitle}
                </Text>
                <TouchableOpacity
                  style={[styles.slideButton, { backgroundColor: slide.buttonColor }]}
                  onPress={() => handleButtonPress(slide.id)}
                >
                  <Text style={[styles.slideButtonText, { color: slide.buttonTextColor }]}>
                    {slide.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.slideImageContainer}>
                <Image 
                  source={slide.image} 
                  style={styles.slideImage} 
                  contentFit="contain" 
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Slider Indicators */}
      <View style={styles.indicators}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, index === currentIndex && styles.indicatorActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
  },
  slider: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  slide: {
    height: 180,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md,
  },
  slideContent: {
    flex: 1,
    flexDirection: 'row',
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slideTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: theme.spacing.sm,
  },
  slideTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  slideSubtitle: {
    fontSize: theme.typography.fontSize.base,
    marginBottom: theme.spacing.md,
    opacity: 0.9,
  },
  slideButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'flex-start',
  },
  slideButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  slideImageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: theme.colors.border.light,
  },
  indicatorActive: {
    backgroundColor: theme.colors.primary[500],
    width: 24,
  },
});

