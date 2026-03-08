export function Hero({ title, subtitle, image, imageMobile, buttonText, buttonLink, contentAlignment }: { title?: string; subtitle?: string; image?: string; imageMobile?: string; buttonText?: string; buttonLink?: string; contentAlignment?: string }) {
 const alignmentClasses = contentAlignment === "left" ? "justify-start text-left" : contentAlignment === "right" ? "justify-end text-right" : "justify-center text-center";

 return (
  <section className="relative w-full">
   {/* Desktop */}
   {image && <img src={image} alt={title ?? "Hero image"} className="hidden w-full md:block" />}

   {/* Mobile */}
   {imageMobile && <img src={imageMobile} alt={title ?? "Hero image"} className="block w-full md:hidden" />}

   <div className="absolute inset-0 bg-black/30" />

   <div className={`absolute inset-0 flex items-center px-6 ${alignmentClasses}`}>
    <div className="max-w-xl">
     {title && <h1 className="text-4xl font-bold text-white sm:text-6xl">{title}</h1>}

     {subtitle && <p className="mt-6 text-lg text-white/90">{subtitle}</p>}

     {buttonText && buttonLink && (
      <a href={buttonLink} className="mt-8 inline-block rounded bg-white px-6 py-3 text-black">
       {buttonText}
      </a>
     )}
    </div>
   </div>
  </section>
 );
}
