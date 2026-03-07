import Footer from "components/layout/footer";
import { getHomepageSections } from "lib/shopify";
import { getThemeSections } from "lib/theme/get-theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
 description: "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
 openGraph: {
  type: "website",
 },
};

export default async function HomePage() {
 const sections = await getHomepageSections();
 const sectionComponents = getThemeSections();

 return (
  <>
   {sections.map((section) => {
    const SectionComponent = sectionComponents[section.type as keyof typeof sectionComponents];

    if (!SectionComponent || !section.collectionHandle) return null;

    return <SectionComponent key={`${section.type}-${section.order}`} collectionHandle={section.collectionHandle} />;
   })}
   <Footer />
  </>
 );
}
