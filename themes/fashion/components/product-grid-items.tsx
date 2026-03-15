import Grid from "components/grid";
import { ProductBadges } from "components/product/product-badges";
import { Product } from "lib/shopify/types";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => {
        const mainImage = product.images?.[0];
        const hoverImage = product.images?.[1];

        return (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <Link
              href={`/product/${product.handle}`}
              className="group block w-full"
              prefetch={true}
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <ProductBadges product={product} />

                {mainImage && (
                  <img
                    src={mainImage.url}
                    alt={product.title}
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${hoverImage ? "group-hover:opacity-0" : "group-hover:opacity-80 group-hover:scale-[1.02]"}`}
                  />
                )}

                {hoverImage && (
                  <img
                    src={hoverImage.url}
                    alt={product.title}
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-300 group-hover:opacity-100"
                  />
                )}
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-sm uppercase tracking-wide text-neutral-800">
                  {product.title}
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  {product.priceRange.maxVariantPrice.amount}{" "}
                  {product.priceRange.maxVariantPrice.currencyCode}
                </p>
              </div>
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}
