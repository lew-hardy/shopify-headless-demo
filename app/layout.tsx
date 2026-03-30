import { AIAssistantPanel } from "components/ai-assistant/ai-assistant-panel";
import { AIAssistantProvider } from "components/ai-assistant/ai-assistant-provider";
import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { getAiAssistantEnabled } from "lib/shopify/get-ai-assistant-enabled";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata: Metadata = {
 metadataBase: new URL(baseUrl),
 title: {
  default: SITE_NAME!,
  template: `%s | ${SITE_NAME}`,
 },
 robots: {
  follow: true,
  index: true,
 },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
 const cart = getCart();
 const aiEnabled = await getAiAssistantEnabled();

 return (
  <html lang="en" className={GeistSans.variable}>
   <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
    <AIAssistantProvider>
     <CartProvider cartPromise={cart}>
      <Navbar />
      <main>
       {children}
       <Toaster closeButton />
       <WelcomeToast />
      </main>

      {aiEnabled && <AIAssistantPanel />}
     </CartProvider>
    </AIAssistantProvider>
   </body>
  </html>
 );
}
