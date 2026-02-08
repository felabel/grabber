/**
 * Maps product names to project SVG components for cart/checkout thumbnails.
 */

import React from 'react';

const FruitsSvg = require('@/assets/images/fruits.svg').default;
const PepperSvg = require('@/assets/images/pepper.svg').default;
const FruitBasketSvg = require('@/assets/images/fruit-basket.svg').default;

export type ProductImageComponent = React.ComponentType<{
  width?: number;
  height?: number;
}>;

const PRODUCT_IMAGE_MAP: Record<string, ProductImageComponent> = {
  Banana: FruitsSvg,
  Pepper: PepperSvg,
  Orange: FruitsSvg,
  Apple: FruitsSvg,
  Mango: FruitsSvg,
};

export function getProductImageComponent(name: string): ProductImageComponent {
  return PRODUCT_IMAGE_MAP[name] ?? FruitBasketSvg;
}
