export type ThemeName = "default" | "fashion" | "electronics";

const themeFromEnv = process.env.NEXT_PUBLIC_THEME as ThemeName | undefined;

export const themeConfig: { activeTheme: ThemeName } = {
  activeTheme: themeFromEnv ?? "default",
};
