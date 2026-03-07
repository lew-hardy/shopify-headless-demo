
export function Hero({ title, subtitle, image, buttonText, buttonLink }: { title?: string; subtitle?: string; image?: string; buttonText?: string; buttonLink?: string }) {
 return (
  <section className="relative aspect-[16/9] w-full overflow-hidden">
   {image && <img src={image} alt={title ?? "Hero image"} className="absolute inset-0 h-full w-full object-cover" />}

   <div className="absolute inset-0 bg-black/30" />

   <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6 text-center">
    <div>
     {title && <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{title}</h1>}

     {subtitle && <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">{subtitle}</p>}

     {buttonText && buttonLink && (
      <a href={buttonLink} className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-medium text-black">
       {buttonText}
      </a>
     )}
    </div>
   </div>
  </section>
 );
}
