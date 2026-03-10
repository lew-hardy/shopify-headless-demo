import Link from "next/link";

export function Hero({ title, subtitle, image, imageMobile, buttonText, buttonLink, contentAlignment, contentAlignmentMobile, contentVerticalAlignment, contentVerticalAlignmentMobile }: { title?: string; subtitle?: string; image?: string; imageMobile?: string; buttonText?: string; buttonLink?: string; contentAlignment?: string; contentAlignmentMobile?: string; contentVerticalAlignment?: string; contentVerticalAlignmentMobile?: string }) {
 const desktopAlignmentClasses = contentAlignment === "left" ? "justify-start text-left" : contentAlignment === "right" ? "justify-end text-right" : "justify-center text-center";
 const mobileAlignmentClasses = contentAlignmentMobile === "left" ? "justify-start text-left" : contentAlignmentMobile === "right" ? "justify-end text-right" : "justify-center text-center";
 const desktopVerticalAlignmentClasses = contentVerticalAlignment === "top" ? "items-start" : contentVerticalAlignment === "bottom" ? "items-end" : "items-center";
 const mobileVerticalAlignmentClasses = contentVerticalAlignmentMobile === "top" ? "items-start" : contentVerticalAlignmentMobile === "bottom" ? "items-end" : "items-center";

 return (
  <section className="relative w-full">
   {image && <img src={image} alt={title ?? "Hero image"} className="hidden w-full md:block" />}

   {imageMobile && <img src={imageMobile} alt={title ?? "Hero image"} className="block w-full md:hidden" />}

   <div className="absolute inset-0 bg-black/45" />

   <div className={`absolute inset-0 flex px-6 md:hidden ${mobileAlignmentClasses} ${mobileVerticalAlignmentClasses}`}>
    <div className="max-w-xl">
     {title && <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">{title}</h1>}

     {subtitle && <p className="mt-4 text-base text-white/85 sm:text-lg">{subtitle}</p>}

     {buttonText && buttonLink && (
      <Link href={buttonLink} className="mt-8 inline-block rounded bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-blue-500">
       {buttonText}
      </Link>
     )}
    </div>
   </div>

   <div className={`absolute inset-0 hidden md:flex ${desktopAlignmentClasses} ${desktopVerticalAlignmentClasses}`}>
    <div className="mx-auto w-full max-w-7xl px-10">
     <div className={`max-w-2xl ${contentAlignment === "left" ? "mr-auto text-left" : contentAlignment === "right" ? "ml-auto text-right" : "mx-auto text-center"}`}>
      {title && <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">{title}</h1>}

      {subtitle && <p className="mt-5 text-lg text-white/80 sm:text-xl">{subtitle}</p>}

      {buttonText && buttonLink && (
       <Link href={buttonLink} className="mt-8 inline-block rounded bg-blue-600 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-blue-500">
        {buttonText}
       </Link>
      )}
     </div>
    </div>
   </div>
  </section>
 );
}
