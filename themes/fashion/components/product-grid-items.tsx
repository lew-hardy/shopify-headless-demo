import Grid from "components/grid";
import { ProductBadges } from "components/product/product-badges";
import { Product } from "lib/shopify/types";
import Link from "next/link";

export default function ProductGridItems({ products }: { products: Product[] }) {
 return (
  <>
   {products.map((product) => (
    <Grid.Item key={product.handle} className="animate-fadeIn">
     <Link href={`/product/${product.handle}`} className="group block w-full" prefetch={true}>
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
       <ProductBadges product={product} />
       <img src={product.featuredImage?.url} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>

      <div className="mt-4 text-center">
       <h3 className="text-sm uppercase tracking-wide text-neutral-800">{product.title}</h3>

       <p className="mt-1 text-sm text-neutral-500">
        {product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
       </p>
      </div>
     </Link>
    </Grid.Item>
   ))}
  </>
 );
}
