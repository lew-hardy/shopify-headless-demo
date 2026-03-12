import { theme as defaultTheme } from "themes/default/config";
import { theme as electronicsTheme } from "themes/electronics/config";
import { theme as fashionTheme } from "themes/fashion/config";

import { Carousel as DefaultCarousel } from "themes/default/sections/carousel";
import { FeaturedProducts as DefaultFeaturedProducts } from "themes/default/sections/featured-products";

import { Carousel as FashionCarousel } from "themes/fashion/sections/carousel";
import { FeaturedProducts as FashionFeaturedProducts } from "themes/fashion/sections/featured-products";

import { Carousel as ElectronicsCarousel } from "themes/electronics/sections/carousel";
import { FeaturedProducts as ElectronicsFeaturedProducts } from "themes/electronics/sections/featured-products";

import { Hero as DefaultHero } from "themes/default/sections/hero";
import { Hero as ElectronicsHero } from "themes/electronics/sections/hero";
import { Hero as FashionHero } from "themes/fashion/sections/hero";

import ProductGridItemsDefault from "themes/default/components/product-grid-items";
import ProductGridItemsElectronics from "themes/electronics/components/product-grid-items";
import ProductGridItemsFashion from "themes/fashion/components/product-grid-items";

import FeaturedCollections from "components/home/featured-collections";

export const themeRegistry = {
 default: {
  config: defaultTheme,
  sections: {
   featured_products: DefaultFeaturedProducts,
   carousel: DefaultCarousel,
   hero: DefaultHero,
   featured_collections: FeaturedCollections,
  },
  components: {
   productGrid: ProductGridItemsDefault,
  },
 },
 fashion: {
  config: fashionTheme,
  sections: {
   featured_products: FashionFeaturedProducts,
   carousel: FashionCarousel,
   hero: FashionHero,
   featured_collections: FeaturedCollections,
  },
  components: {
   productGrid: ProductGridItemsFashion,
  },
 },
 electronics: {
  config: electronicsTheme,
  sections: {
   featured_products: ElectronicsFeaturedProducts,
   carousel: ElectronicsCarousel,
   hero: ElectronicsHero,
   featured_collections: FeaturedCollections,
  },
  components: {
   productGrid: ProductGridItemsElectronics,
  },
 },
};
