import Footer from "components/layout/footer";
import { getHomepageSections } from "lib/shopify";
import { getThemeSections } from "lib/theme/get-theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Store Name",
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
    title: "Your Store Name",
    description:
      "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
    siteName: "Your Store Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Store Name",
    description:
      "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  },
};

export default async function HomePage() {
  const sections = await getHomepageSections();
  const sectionComponents = getThemeSections();

  return (
    <>
      {sections.map((section) => {
        if (section.type === "hero") {
          const HeroSection = sectionComponents.hero;
          if (!HeroSection) return null;

          return (
            <HeroSection
              key={`${section.type}-${section.order}`}
              title={section.title}
              subtitle={section.subtitle}
              image={section.image}
              imageMobile={section.imageMobile}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
              contentAlignment={section.contentAlignment}
              contentAlignmentMobile={section.contentAlignmentMobile}
              contentVerticalAlignment={section.contentVerticalAlignment}
              contentVerticalAlignmentMobile={
                section.contentVerticalAlignmentMobile
              }
            />
          );
        }

        if (section.type === "featured_products") {
          const FeaturedProductsSection = sectionComponents.featured_products;
          if (!FeaturedProductsSection || !section.collectionHandle)
            return null;

          return (
            <FeaturedProductsSection
              key={`${section.type}-${section.order}`}
              collectionHandle={section.collectionHandle}
            />
          );
        }

        if (section.type === "carousel") {
          const CarouselSection = sectionComponents.carousel;
          if (!CarouselSection || !section.collectionHandle) return null;

          return (
            <CarouselSection
              key={`${section.type}-${section.order}`}
              collectionHandle={section.collectionHandle}
            />
          );
        }

        if (section.type === "featured_collections") {
          const FeaturedCollectionsSection =
            sectionComponents.featured_collections;
          if (!FeaturedCollectionsSection) return null;

          return (
            <FeaturedCollectionsSection
              key={`${section.type}-${section.order}`}
              title={section.title || "Shop by Collection"}
              handles={section.collectionHandles ?? []}
            />
          );
        }

        return null;
      })}
      <Footer />
    </>
  );
}
