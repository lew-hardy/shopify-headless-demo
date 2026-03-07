import Link from "next/link";

export function Hero({ title, subtitle, image, buttonText, buttonLink }: { title?: string; subtitle?: string; image?: string; buttonText?: string; buttonLink?: string }) {
 return (
  <section className="relative w-full overflow-hidden">
   {image && <img src={image} alt={title ?? "Hero image"} className="absolute inset-0 h-full w-full object-cover" />}

   <div className="relative mx-auto max-w-7xl px-6 py-32 text-center">
    {title && <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{title}</h1>}

    {subtitle && <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">{subtitle}</p>}

    {buttonText && buttonLink && (
     <Link href={buttonLink} className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-medium text-black">
      {buttonText}
     </Link>
    )}
   </div>
  </section>
 );
}
