import { themeConfig, type ThemeName } from "./config";

import { Carousel as DefaultCarousel } from "themes/default/sections/carousel";
import { FeaturedProducts as DefaultFeaturedProducts } from "themes/default/sections/featured-products";

import { Carousel as FashionCarousel } from "themes/fashion/sections/carousel";
import { FeaturedProducts as FashionFeaturedProducts } from "themes/fashion/sections/featured-products";

import { Carousel as ElectronicsCarousel } from "themes/electronics/sections/carousel";
import { FeaturedProducts as ElectronicsFeaturedProducts } from "themes/electronics/sections/featured-products";

const themeSectionRegistry: Record<
 ThemeName,
 {
  featured_products: typeof DefaultFeaturedProducts;
  carousel: typeof DefaultCarousel;
 }
> = {
 default: {
  featured_products: DefaultFeaturedProducts,
  carousel: DefaultCarousel,
 },
 fashion: {
  featured_products: FashionFeaturedProducts,
  carousel: FashionCarousel,
 },
 electronics: {
  featured_products: ElectronicsFeaturedProducts,
  carousel: ElectronicsCarousel,
 },
};

export function getThemeSections() {
 return themeSectionRegistry[themeConfig.activeTheme] ?? themeSectionRegistry.default;
}
