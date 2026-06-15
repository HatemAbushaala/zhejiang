import Image from "next/image"
import { ChevronDownIcon } from "@/app/_components/site-icons"
import type { SiteData } from "@/lib/site-db"

export function Hero({ hero }: { hero: SiteData["hero"] }) {
  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden pt-16">
      <div className="absolute inset-0">
        <Image src={hero.bgImage} alt="Industrial tools background" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <p className="text-orange-400 uppercase tracking-widest text-sm font-semibold mb-4">{hero.tag}</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          {hero.title}
          <br />
          <span className="text-orange-400">{hero.titleHighlight}</span>
        </h1>
        <p className="text-xl sm:text-2xl font-light text-gray-200 mb-4">{hero.subtitle}</p>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">{hero.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-colors text-sm">
            {hero.ctaPrimary}
          </a>
          <a href="#products" className="border border-white text-white hover:bg-white/10 font-bold px-8 py-3 rounded-full transition-colors text-sm">
            {hero.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="text-white/60 w-6 h-6" />
      </div>
    </section>
  )
}
