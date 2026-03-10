import { themeConfig } from "./config";
import { themeRegistry } from "./registry";

export function getThemeSections() {
 return themeRegistry[themeConfig.activeTheme].sections;
}

export function getThemeComponents() {
 const components = themeRegistry[themeConfig.activeTheme].components;

 return {
  ProductGrid: components.productGrid,
 };
}
