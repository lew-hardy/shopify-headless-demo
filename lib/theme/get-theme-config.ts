import { themeConfig, type ThemeName } from "./config";

import { theme as defaultTheme } from "themes/default/config";
import { theme as electronicsTheme } from "themes/electronics/config";
import { theme as fashionTheme } from "themes/fashion/config";

const themeRegistry: Record<ThemeName, typeof defaultTheme> = {
 default: defaultTheme,
 fashion: fashionTheme,
 electronics: electronicsTheme,
};

export function getThemeConfig() {
 return themeRegistry[themeConfig.activeTheme] ?? themeRegistry.default;
}
