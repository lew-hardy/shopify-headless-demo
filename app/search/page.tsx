import Grid from "components/grid";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";
import { getThemeComponents } from "lib/theme/get-theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Search",
 description: "Search for products in the store.",
};

export default async function SearchPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
 const searchParams = await props.searchParams;

 const sort = typeof searchParams?.sort === "string" ? searchParams.sort : undefined;
 const searchValue = typeof searchParams?.q === "string" ? searchParams.q : "";
 const query = searchValue.trim();

 const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
 const products = query ? await getProducts({ sortKey, reverse, query }) : [];
 const resultsText = products.length === 1 ? "result" : "results";
 const { ProductGrid } = getThemeComponents();

 return (
  <>
   {!query ? (
    <p className="text-sm text-neutral-500">Enter a search term to find products.</p>
   ) : (
    <p className="mb-4">
     {products.length === 0 ? "There are no products that match " : `Showing ${products.length} ${resultsText} for `}
     <span className="font-bold">&quot;{query}&quot;</span>
    </p>
   )}

   {products.length > 0 ? (
    <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
     <ProductGrid products={products} />
    </Grid>
   ) : null}
  </>
 );
}
