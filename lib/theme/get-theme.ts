import { themeConfig } from "./config";

import { Carousel as DefaultCarousel } from "themes/default/sections/carousel";
import { FeaturedProducts as DefaultFeaturedProducts } from "themes/default/sections/featured-products";

import { Carousel as FashionCarousel } from "themes/fashion/sections/carousel";
import { FeaturedProducts as FashionFeaturedProducts } from "themes/fashion/sections/featured-products";

export function getThemeSections() {
 switch (themeConfig.activeTheme) {
  case "fashion":
   return {
    featured_products: FashionFeaturedProducts,
    carousel: FashionCarousel,
   };

  case "default":
  default:
   return {
    featured_products: DefaultFeaturedProducts,
    carousel: DefaultCarousel,
   };
 }
}
