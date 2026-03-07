import { themeConfig } from "./config";

import { theme as defaultTheme } from "themes/default/config";
import { theme as fashionTheme } from "themes/fashion/config";

export function getThemeConfig() {
 switch (themeConfig.activeTheme) {
  case "fashion":
   return fashionTheme;

  case "default":
  default:
   return defaultTheme;
 }
}
