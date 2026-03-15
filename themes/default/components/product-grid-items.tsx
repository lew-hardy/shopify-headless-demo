import Grid from "components/grid";
import Label from "components/grid/label";
import { ProductBadges } from "components/product/product-badges";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => {
        const mainImage = product.images?.[0] || product.featuredImage;
        const hoverImage = product.images?.[1];

        return (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <Link
              className="group relative inline-block h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white hover:border-blue-600 dark:border-neutral-800 dark:bg-black">
                <ProductBadges product={product} />

                {mainImage?.url ? (
                  <Image
                    src={mainImage.url}
                    alt={mainImage.altText || product.title}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={`absolute inset-0 h-full w-full object-contain transition duration-500 ease-in-out ${hoverImage ? "group-hover:opacity-0" : "group-hover:scale-[1.02] group-hover:opacity-80"}`}
                  />
                ) : null}

                {hoverImage?.url ? (
                  <Image
                    src={hoverImage.url}
                    alt={hoverImage.altText || product.title}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 h-full w-full object-contain opacity-0 transition duration-500 ease-in-out group-hover:opacity-100"
                  />
                ) : null}

                <Label
                  title={product.title}
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                />
              </div>
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}
