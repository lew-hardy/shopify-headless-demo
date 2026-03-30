import { AIAssistantChat } from "components/ai-assistant-chat";
import { GridTileImage } from "components/grid/tile";
import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductBadges } from "components/product/product-badges";
import { ProductDescription } from "components/product/product-description";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import { getAiAssistantEnabled } from "lib/shopify/get-ai-assistant-enabled";
import type { Image, Product } from "lib/shopify/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: { params: Promise<{ handle: string }> }): Promise<Metadata> {
 const params = await props.params;
 const product = await getProduct(params.handle);

 if (!product) {
  return {};
 }

 const { url, width, height, altText: alt } = product.featuredImage || {};
 const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
 const title = product.seo.title || product.title;
 const description = product.seo.description || product.description;
 const productUrl = `/product/${product.handle}`;

 return {
  title,
  description,
  robots: {
   index: indexable,
   follow: indexable,
   googleBot: {
    index: indexable,
    follow: indexable,
   },
  },
  openGraph: {
   type: "website",
   title,
   description,
   url: productUrl,
   siteName: "Your Store Name",
   images: url
    ? [
       {
        url,
        width,
        height,
        alt: alt ?? undefined,
       },
      ]
    : [],
  },
  twitter: {
   card: "summary_large_image",
   title,
   description,
   images: url ? [url] : [],
  },
 };
}

function mapProductForAssistant(product: Product) {
 return {
  id: product.id,
  handle: product.handle,
  title: product.title,
  description: product.description,
  availableForSale: product.availableForSale,
  tags: product.tags,
  price: product.priceRange.minVariantPrice.amount,
  currencyCode: product.priceRange.minVariantPrice.currencyCode,
  options: product.options?.map((option) => ({
   name: option.name,
   values: option.values,
  })),
 };
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
 const params = await props.params;
 const product = await getProduct(params.handle);

 if (!product) return notFound();

 const [relatedProducts, aiEnabled] = await Promise.all([getProductRecommendations(product.id), getAiAssistantEnabled()]);

 const assistantProducts = [mapProductForAssistant(product), ...relatedProducts.map(mapProductForAssistant)];

 const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  description: product.description,
  image: product.featuredImage.url,
  url: `/product/${product.handle}`,
  offers: {
   "@type": "AggregateOffer",
   availability: product.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
   priceCurrency: product.priceRange.minVariantPrice.currencyCode,
   highPrice: product.priceRange.maxVariantPrice.amount,
   lowPrice: product.priceRange.minVariantPrice.amount,
  },
 };

 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
     __html: JSON.stringify(productJsonLd),
    }}
   />
   <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
    <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-2">
     <div className="h-full w-full basis-full lg:basis-4/6">
      <Suspense fallback={<div className="relative aspect-square w-full overflow-hidden" />}>
       <Gallery
        images={product.images.map((image: Image) => ({
         src: image.url,
         altText: image.altText ?? product.title,
        }))}
        variants={product.variants}
       />
      </Suspense>
     </div>

     <div className="basis-full lg:basis-2/6">
      <Suspense fallback={null}>
       <ProductDescription product={product} />
      </Suspense>

      {aiEnabled && (
       <div className="mt-8">
        <AIAssistantChat products={assistantProducts} />
       </div>
      )}
     </div>
    </div>

    <RelatedProducts products={relatedProducts} />
   </div>
   <Footer />
  </>
 );
}

function RelatedProducts({ products }: { products: Product[] }) {
 if (!products.length) return null;

 return (
  <div className="py-8">
   <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
   <ul className="flex w-full gap-4 overflow-x-auto pt-1">
    {products.map((product) => (
     <li key={product.handle} className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
      <Link className="relative h-full w-full" href={`/product/${product.handle}`} prefetch={true}>
       <ProductBadges product={product} />
       <GridTileImage
        alt={product.title}
        label={{
         title: product.title,
         amount: product.priceRange.maxVariantPrice.amount,
         currencyCode: product.priceRange.maxVariantPrice.currencyCode,
        }}
        src={product.featuredImage?.url}
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
       />
      </Link>
     </li>
    ))}
   </ul>
  </div>
 );
}
