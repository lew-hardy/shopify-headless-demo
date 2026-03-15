import { GeistSans } from "geist/font/sans";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata: Metadata = {
 metadataBase: new URL(baseUrl),
 title: {
  default: SITE_NAME || "Site",
  template: `%s | ${SITE_NAME || "Site"}`,
 },
 robots: {
  follow: true,
  index: true,
 },
};

export default function RootLayout({ children }: { children: ReactNode }) {
 return (
  <html lang="en" className={GeistSans.variable}>
   <body>{children}</body>
  </html>
 );
}
