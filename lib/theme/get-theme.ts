import { themeConfig } from "./config";
import { themeRegistry } from "./registry";

export function getThemeSections() {
 return themeRegistry[themeConfig.activeTheme].sections;
}
