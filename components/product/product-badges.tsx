import type { Product } from "lib/shopify/types";

export function ProductBadges({ product }: { product: Product }) {
 const tags = product.tags.map((tag) => tag.toLowerCase());

 const badges = [];

 if (!product.availableForSale) badges.push("Sold Out");
 if (tags.includes("sale")) badges.push("Sale");
 if (tags.includes("new")) badges.push("New");
 if (tags.includes("bestseller")) badges.push("Best Seller");

 if (badges.length === 0) return null;

 return (
  <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
   {badges.map((badge) => (
    <span key={badge} className="rounded-full bg-black px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
     {badge}
    </span>
   ))}
  </div>
 );
}
