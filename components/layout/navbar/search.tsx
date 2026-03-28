"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
 id: string;
 handle: string;
 title: string;
 featuredImage?: {
  url: string;
 } | null;
};

export default function Search() {
 const searchParams = useSearchParams();
 const router = useRouter();

 const [query, setQuery] = useState(searchParams?.get("q") || "");
 const [results, setResults] = useState<Product[]>([]);
 const [open, setOpen] = useState(false);

 useEffect(() => {
  const delay = setTimeout(async () => {
   if (!query.trim()) {
    setResults([]);
    setOpen(false);
    return;
   }

   try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
    setOpen(true);
   } catch {
    setResults([]);
    setOpen(false);
   }
  }, 250);

  return () => clearTimeout(delay);
 }, [query]);

 function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const trimmed = query.trim();
  if (!trimmed) return;

  router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  setOpen(false);
 }

 return (
  <div className="relative w-full lg:w-80 xl:w-full">
   <form onSubmit={handleSubmit}>
    <input type="text" name="q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products..." autoComplete="off" className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400" />
    <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
     <MagnifyingGlassIcon className="h-4" />
    </div>
   </form>

   {open && results.length > 0 ? (
    <div className="absolute left-0 right-0 z-50 mt-2 rounded-xl border bg-white shadow-lg dark:border-neutral-800 dark:bg-black">
     {results.map((product) => (
      <button
       key={product.id}
       type="button"
       onClick={() => {
        router.push(`/product/${product.handle}`);
        setOpen(false);
       }}
       className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-neutral-100 dark:hover:bg-neutral-900"
      >
       {product.featuredImage?.url ? <img src={product.featuredImage.url} alt={product.title} className="h-10 w-10 rounded object-cover" /> : null}
       <span className="text-sm">{product.title}</span>
      </button>
     ))}
    </div>
   ) : null}
  </div>
 );
}

export function SearchSkeleton() {
 return (
  <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
   <input placeholder="Search for products..." className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400" />
   <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
    <MagnifyingGlassIcon className="h-4" />
   </div>
  </form>
 );
}
