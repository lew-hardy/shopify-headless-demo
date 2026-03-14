import Grid from "components/grid";
import { defaultSort, sorting } from "lib/constants";
import { getCollection, getCollectionProducts } from "lib/shopify";
import { getThemeComponents } from "lib/theme/get-theme";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: { params: Promise<{ collection: string }> }): Promise<Metadata> {
 const params = await props.params;
 const collection = await getCollection(params.collection);

 if (!collection) return notFound();

 const title = collection.seo?.title || collection.title;
 const description = collection.seo?.description || collection.description || `${collection.title} products`;
 const collectionUrl = `/search/${collection.handle}`;

 return {
  title,
  description,
  openGraph: {
   type: "website",
   title,
   description,
   url: collectionUrl,
   siteName: "Your Store Name",
   images: collection.image?.url
    ? [
       {
        url: collection.image.url,
        width: collection.image.width,
        height: collection.image.height,
        alt: collection.image.altText ?? collection.title,
       },
      ]
    : [],
  },
  twitter: {
   card: "summary_large_image",
   title,
   description,
   images: collection.image?.url ? [collection.image.url] : [],
  },
 };
}

export default async function CategoryPage(props: { params: Promise<{ collection: string }>; searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
 const searchParams = await props.searchParams;
 const params = await props.params;
 const { sort } = searchParams as { [key: string]: string };
 const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

 const products = await getCollectionProducts({
  collection: params.collection,
  sortKey,
  reverse,
 });

 const { ProductGrid } = getThemeComponents();

 return (
  <section>
   {products.length === 0 ? (
    <p className="py-3 text-lg">{`No products found in this collection`}</p>
   ) : (
    <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
     <ProductGrid products={products} />
    </Grid>
   )}
  </section>
 );
}
