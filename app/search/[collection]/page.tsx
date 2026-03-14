import { getCollection } from "lib/shopify";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ collection: string }> }): Promise<Metadata> {
 const params = await props.params;
 const collection = await getCollection(params.collection);

 if (!collection) {
  return {};
 }

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
