import Link from "next/link";

export function Hero({ title, subtitle, image, imageMobile, buttonText, buttonLink, contentAlignment, contentAlignmentMobile }: { title?: string; subtitle?: string; image?: string; imageMobile?: string; buttonText?: string; buttonLink?: string; contentAlignment?: string; contentAlignmentMobile?: string }) {
 const desktopAlignmentClasses = contentAlignment === "left" ? "justify-start text-left" : contentAlignment === "right" ? "justify-end text-right" : "justify-center text-center";

 const mobileAlignmentClasses = contentAlignmentMobile === "left" ? "justify-start text-left" : contentAlignmentMobile === "right" ? "justify-end text-right" : "justify-center text-center";

 return (
  <section className="relative w-full">
   {image && <img src={image} alt={title ?? "Hero image"} className="hidden w-full md:block" />}

   {imageMobile && <img src={imageMobile} alt={title ?? "Hero image"} className="block w-full md:hidden" />}

   <div className="absolute inset-0 bg-black/20" />

   <div className={`absolute inset-0 flex items-center px-6 md:hidden ${mobileAlignmentClasses}`}>
    <div className="max-w-xl">
     {title && <h1 className="text-5xl font-light tracking-tight text-white sm:text-7xl">{title}</h1>}

     {subtitle && <p className="mt-6 text-lg text-white/90">{subtitle}</p>}

     {buttonText && buttonLink && (
      <Link href={buttonLink} className="mt-8 inline-block border border-white px-8 py-3 text-sm uppercase tracking-wider text-white transition hover:bg-white hover:text-black">
       {buttonText}
      </Link>
     )}
    </div>
   </div>

   <div className={`absolute inset-0 hidden items-center md:flex ${desktopAlignmentClasses}`}>
    <div className="mx-auto w-full max-w-7xl px-10">
     <div className={`max-w-lg ${contentAlignment === "left" ? "mr-auto text-left" : contentAlignment === "right" ? "ml-auto text-right" : "mx-auto text-center"}`}>
      {title && <h1 className="text-5xl font-light tracking-tight text-white sm:text-7xl">{title}</h1>}

      {subtitle && <p className="mt-4 text-lg text-white/80">{subtitle}</p>}

      {buttonText && buttonLink && (
       <Link href={buttonLink} className="mt-8 inline-block border border-white px-8 py-3 text-sm uppercase tracking-wider text-white transition hover:bg-white hover:text-black">
        {buttonText}
       </Link>
      )}
     </div>
    </div>
   </div>
  </section>
 );
}
