import { themeConfig } from "./config";
import { themeRegistry } from "./registry";

export function getThemeSections() {
 return themeRegistry[themeConfig.activeTheme as keyof typeof themeRegistry].sections;
}

export function getThemeComponents() {
 const components = themeRegistry[themeConfig.activeTheme as keyof typeof themeRegistry].components;

 return {
  ProductGrid: components.productGrid,
 };
}
