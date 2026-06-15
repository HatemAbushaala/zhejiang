import Image from "next/image"
import type { SiteData } from "@/lib/site-db"

export function Services({ services }: { services: SiteData["services"] }) {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-orange-500 uppercase tracking-widest text-xs font-semibold mb-3">What We Offer</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Manufacturing Excellence</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Supporting Global Demands</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gray-900/20" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{service.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
