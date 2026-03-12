import Grid from "components/grid";
import { getCollections } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

type Props = {
 title?: string;
 limit?: number;
 handles?: string[];
};

export default async function FeaturedCollections({ title = "Shop by Collection", limit = 3, handles = [] }: Props) {
 const collections = await getCollections();

 const filteredCollections = collections
  .filter((collection) => collection.handle)
  .filter((collection) => (handles.length ? handles.includes(collection.handle) : true))
  .sort((a, b) => {
   if (!handles.length) return 0;
   return handles.indexOf(a.handle) - handles.indexOf(b.handle);
  })
  .slice(0, limit);

 if (!filteredCollections.length) return null;

 return (
  <section className="mx-auto w-full max-w-screen-2xl px-4 py-12 md:px-6 md:py-16">
   <div className="mb-6 md:mb-8">
    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
   </div>

   <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {filteredCollections.map((collection) => (
     <Grid.Item key={collection.handle} className="aspect-[4/5] overflow-hidden rounded-lg">
      <Link href={collection.path} className="group relative block h-full w-full overflow-hidden rounded-lg">
       {collection.image?.url ? <Image src={collection.image.url} alt={collection.image.altText || collection.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" /> : <div className="h-full w-full bg-neutral-100" />}

       <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30" />

       <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="text-lg font-medium md:text-xl">{collection.title}</h3>
        {collection.description ? <p className="mt-1 line-clamp-2 text-sm text-white/85">{collection.description}</p> : null}
       </div>
      </Link>
     </Grid.Item>
    ))}
   </Grid>
  </section>
 );
}
