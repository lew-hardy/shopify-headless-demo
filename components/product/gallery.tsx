"use client";

import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
 const router = useRouter();
 const searchParams = useSearchParams();
 const imageIndex = searchParams.has("image") ? parseInt(searchParams.get("image")!) : 0;

 const [isLightboxOpen, setIsLightboxOpen] = useState(false);

 const updateImage = (index: string) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("image", index);
  router.replace(`?${params.toString()}`, { scroll: false });
 };

 const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
 const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;

 const buttonClassName = "flex h-full items-center justify-center px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white";
 const currentImage = images[imageIndex];

 return (
  <>
   <form>
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-50">
     {images[imageIndex] && (
      <>
       <Image className="h-full w-full object-contain cursor-zoom-in" fill sizes="(min-width: 1024px) 66vw, 100vw" alt={images[imageIndex].altText} src={images[imageIndex].src} priority />

       <button type="button" onClick={() => setIsLightboxOpen(true)} className="absolute inset-0" aria-label="Open enlarged product image" />
      </>
     )}

     {images.length > 1 && (
      <div className="absolute bottom-[15%] z-10 flex w-full justify-center">
       <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
        <button formAction={() => updateImage(previousImageIndex.toString())} aria-label="Previous product image" className={buttonClassName}>
         <ArrowLeftIcon className="h-5" />
        </button>

        <div className="mx-1 h-6 w-px bg-neutral-500" />

        <button formAction={() => updateImage(nextImageIndex.toString())} aria-label="Next product image" className={buttonClassName}>
         <ArrowRightIcon className="h-5" />
        </button>
       </div>
      </div>
     )}
    </div>

    {images.length > 1 && (
     <ul className="my-12 flex flex-wrap items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
      {images.map((image, index) => {
       const isActive = index === imageIndex;

       return (
        <li key={image.src} className="h-20 w-20">
         <button formAction={() => updateImage(index.toString())} aria-label="Select product image" className="h-full w-full">
          <GridTileImage alt={image.altText} src={image.src} width={80} height={80} active={isActive} />
         </button>
        </li>
       );
      })}
     </ul>
    )}
   </form>

   {/* LIGHTBOX */}
   {isLightboxOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
     {/* Overlay */}
     <div className="absolute inset-0 bg-black/90" onClick={() => setIsLightboxOpen(false)} />

     {/* Close button */}
     <button onClick={() => setIsLightboxOpen(false)} className="absolute right-6 top-6 z-20 text-white" aria-label="Close image">
      <XMarkIcon className="h-8 w-8" />
     </button>

     {/* Image */}
     <div className="relative z-10 pointer-events-none">
      <Image src={images[imageIndex]?.src ?? ""} alt={images[imageIndex]?.altText ?? ""} width={1200} height={1200} className="max-h-[90vh] w-auto object-contain pointer-events-auto" />
     </div>
    </div>
   )}
  </>
 );
}
