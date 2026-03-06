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

 return (
  <>
   {sections.map((section) => {
    if (section.type === "featured_products") {
     return <ThreeItemGrid key={`${section.type}-${section.order}`} collectionHandle={section.collectionHandle!} />;
    }
    if (section.type === "carousel") {
     return <Carousel key={`${section.type}-${section.order}`} collectionHandle={section.collectionHandle!} />;
    }
    return null;
   })}
   <Footer />
  </>
 );
}
