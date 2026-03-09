import Link from "next/link";
import { Suspense } from "react";

import FooterMenu from "components/layout/footer-menu";
import { getMenu } from "lib/shopify";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
 const currentYear = new Date().getFullYear();
 const copyrightName = COMPANY_NAME || SITE_NAME || "Lewis Hardy";
 const skeleton = "h-6 w-full animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700";

 const menu = await getMenu("footer");

 return (
  <footer className="border-t border-neutral-200 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
   <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between md:px-4 min-[1320px]:px-0">
    <div className="max-w-sm">
     <Link className="text-lg font-semibold tracking-wide text-black dark:text-white" href="/">
      {SITE_NAME}
     </Link>

     <p className="mt-4 text-sm leading-6 text-neutral-500 dark:text-neutral-400">A headless Shopify storefront built with Next.js, Shopify Storefront API, and a CMS-driven section architecture.</p>
    </div>

    <Suspense
     fallback={
      <div className="flex w-full max-w-[220px] flex-col gap-2">
       <div className={skeleton} />
       <div className={skeleton} />
       <div className={skeleton} />
       <div className={skeleton} />
      </div>
     }
    >
     <FooterMenu menu={menu} />
    </Suspense>

    <div className="flex flex-col gap-3 md:items-end">
     <a href="https://github.com/lew-hardy/" target="_blank" rel="noreferrer" className="text-black transition-opacity hover:opacity-70 dark:text-white">
      GitHub
     </a>
     <a href="https://lewishardy.co.uk/" target="_blank" rel="noreferrer" className="text-black transition-opacity hover:opacity-70 dark:text-white">
      Portfolio
     </a>
    </div>
   </div>

   <div className="border-t border-neutral-200 px-6 py-6 dark:border-neutral-800">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between md:px-4 min-[1320px]:px-0">
     <p>
      &copy; {currentYear} {copyrightName}. All rights reserved.
     </p>
     <p className="text-neutral-500 dark:text-neutral-400">Built by Lewis Hardy with Next.js and Shopify.</p>
    </div>
   </div>
  </footer>
 );
}
