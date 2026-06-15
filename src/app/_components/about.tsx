import Image from "next/image"
import type { SiteData } from "@/lib/site-db"

export function About({ about }: { about: SiteData["about"] }) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-50 flex items-center justify-center">
            <Image src={about.image} alt={about.title} fill className="object-contain p-8" />
          </div>

          <div>
            <p className="text-orange-500 uppercase tracking-widest text-xs font-semibold mb-3">{about.tag}</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">{about.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{about.description1}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{about.description2}</p>
            <p className="text-gray-600 leading-relaxed">{about.description3}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
