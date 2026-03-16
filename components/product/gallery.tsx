"use client";

import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import { ProductVariant } from "lib/shopify/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type GalleryImage = {
 src: string;
 altText: string;
};

const normalizeShopifyImageUrl = (url: string) => url.split("?")[0];

export function Gallery({ images, variants }: { images: GalleryImage[]; variants: ProductVariant[] }) {
 const searchParams = useSearchParams();
 const [isLightboxOpen, setIsLightboxOpen] = useState(false);
 const [imageIndex, setImageIndex] = useState(0);
 const lightboxRef = useRef<HTMLDivElement>(null);
 const pointerStartX = useRef<number | null>(null);

 const selectedVariant = useMemo(() => {
  return variants.find((variant) => variant.selectedOptions.every((option) => searchParams.get(option.name.toLowerCase()) === option.value));
 }, [variants, searchParams]);

 const orderedImages = useMemo(() => {
  const selectedVariantImage = selectedVariant?.image?.url;

  if (!selectedVariantImage) return images;

  const normalizedSelected = normalizeShopifyImageUrl(selectedVariantImage);

  const matchingImage = images.find((image) => normalizeShopifyImageUrl(image.src) === normalizedSelected);

  if (!matchingImage) return images;

  const remainingImages = images.filter((image) => normalizeShopifyImageUrl(image.src) !== normalizedSelected);

  return [matchingImage, ...remainingImages];
 }, [images, selectedVariant]);

 useEffect(() => {
  setImageIndex(0);
 }, [selectedVariant?.id]);

 useEffect(() => {
  if (imageIndex >= orderedImages.length) {
   setImageIndex(0);
  }
 }, [imageIndex, orderedImages.length]);

 const nextImageIndex = imageIndex + 1 < orderedImages.length ? imageIndex + 1 : 0;
 const previousImageIndex = imageIndex === 0 ? orderedImages.length - 1 : imageIndex - 1;

 const goNext = () => setImageIndex(nextImageIndex);
 const goPrevious = () => setImageIndex(previousImageIndex);

 useEffect(() => {
  if (!isLightboxOpen) return;

  const handleKeyDown = (event: KeyboardEvent) => {
   if (event.key === "Escape") {
    setIsLightboxOpen(false);
   } else if (event.key === "ArrowRight") {
    goNext();
   } else if (event.key === "ArrowLeft") {
    goPrevious();
   }
  };

  window.addEventListener("keydown", handleKeyDown);
  lightboxRef.current?.focus();

  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [isLightboxOpen, imageIndex, orderedImages.length]);

 const buttonClassName = "flex h-full items-center justify-center px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white";

 const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
  pointerStartX.current = event.clientX;
 };

 const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
  if (pointerStartX.current === null) return;

  const deltaX = event.clientX - pointerStartX.current;
  const swipeThreshold = 50;

  if (deltaX > swipeThreshold) {
   goPrevious();
  } else if (deltaX < -swipeThreshold) {
   goNext();
  }

  pointerStartX.current = null;
 };

 const currentImage = orderedImages[imageIndex];

 if (!currentImage) return null;

 return (
  <>
   <div>
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-50">
     <Image className="h-full w-full cursor-zoom-in object-contain" fill sizes="(min-width: 1024px) 66vw, 100vw" alt={currentImage.altText} src={currentImage.src} priority />

     <button type="button" onClick={() => setIsLightboxOpen(true)} className="absolute inset-0" aria-label="Open enlarged product image" />

     {orderedImages.length > 1 && (
      <>
       <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm dark:bg-black/60 dark:text-white">
        {imageIndex + 1} / {orderedImages.length}
       </div>

       <div className="absolute bottom-4 z-10 flex w-full justify-center">
        <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
         <button type="button" onClick={goPrevious} aria-label="Previous product image" className={buttonClassName}>
          <ArrowLeftIcon className="h-5" />
         </button>
         <div className="mx-1 h-6 w-px bg-neutral-500" />
         <button type="button" onClick={goNext} aria-label="Next product image" className={buttonClassName}>
          <ArrowRightIcon className="h-5" />
         </button>
        </div>
       </div>
      </>
     )}
    </div>

    {orderedImages.length > 1 && (
     <ul className="my-8 flex flex-wrap items-center justify-center gap-3 overflow-auto py-1 lg:mb-0">
      {orderedImages.map((image, index) => {
       const isActive = index === imageIndex;

       return (
        <li key={image.src} className="h-20 w-20">
         <button type="button" onClick={() => setImageIndex(index)} aria-label={`Select product image ${index + 1}`} className="h-full w-full">
          <GridTileImage alt={image.altText} src={image.src} width={80} height={80} active={isActive} />
         </button>
        </li>
       );
      })}
     </ul>
    )}
   </div>

   {isLightboxOpen && (
    <div ref={lightboxRef} tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center outline-none" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
     <div className="absolute inset-0 bg-black/90" onClick={() => setIsLightboxOpen(false)} />

     <button onClick={() => setIsLightboxOpen(false)} className="absolute right-6 top-6 z-20 text-white" aria-label="Close image">
      <XMarkIcon className="h-8 w-8" />
     </button>

     {orderedImages.length > 1 && (
      <>
       <button type="button" onClick={goPrevious} className="absolute left-4 z-20 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60" aria-label="Previous image">
        <ArrowLeftIcon className="h-6 w-6" />
       </button>

       <button type="button" onClick={goNext} className="absolute right-4 z-20 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60" aria-label="Next image">
        <ArrowRightIcon className="h-6 w-6" />
       </button>

       <div className="absolute bottom-6 z-20 rounded-full bg-black/40 px-3 py-1 text-sm text-white">
        {imageIndex + 1} / {orderedImages.length}
       </div>
      </>
     )}

     <div className="pointer-events-none relative z-10 flex h-full w-full items-center justify-center p-6">
      <Image src={currentImage.src} alt={currentImage.altText} width={1600} height={1600} className="pointer-events-auto max-h-[90vh] w-auto object-contain" />
     </div>
    </div>
   )}
  </>
 );
}
