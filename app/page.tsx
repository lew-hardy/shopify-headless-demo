import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import { getHomepageSections } from "lib/shopify";

export const metadata = {
 description: "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
 openGraph: { type: "website" },
};

export default async function HomePage() {
 const sections = await getHomepageSections();

 const sectionComponents = {
  featured_products: ThreeItemGrid,
  carousel: Carousel,
 };

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
