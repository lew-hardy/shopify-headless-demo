import { getCollection, getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "components/grid";
import { defaultSort, sorting } from "lib/constants";
import { getThemeComponents } from "lib/theme/get-theme";

export async function generateMetadata(props: { params: Promise<{ collection: string }> }): Promise<Metadata> {
 const params = await props.params;
 const collection = await getCollection(params.collection);

 if (!collection) return notFound();

 return {
  title: collection.seo?.title || collection.title,
  description: collection.seo?.description || collection.description || `${collection.title} products`,
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
