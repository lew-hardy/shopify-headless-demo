import { themeConfig } from "./config";
import { themeRegistry } from "./registry";

export function getThemeConfig() {
  return themeRegistry[themeConfig.activeTheme].config;
}
