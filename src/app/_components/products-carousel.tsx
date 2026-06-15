"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@/app/_components/site-icons"
import type { SiteData } from "@/lib/site-db"

export function ProductsCarousel({ products }: { products: SiteData["products"] }) {
  const [activeSlide, setActiveSlide] = useState(0)

  const prev = () => setActiveSlide((p) => (p - 1 + products.length) % products.length)
  const next = () => setActiveSlide((p) => (p + 1) % products.length)

  const current = products[activeSlide]

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-orange-500 uppercase tracking-widest text-xs font-semibold mb-3">What We Make</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Our Professional Catalog</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">High-Impact Tools For Every Shank Standard</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-80">
                <Image src={current.image} alt={current.title} fill className="object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider mb-2">
                  Product {activeSlide + 1} of {products.length}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{current.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8">{current.description}</p>
                <a
                  href="#contact"
                  className="self-start bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                >
                  Inquire Now
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-5 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-colors"
            aria-label="Previous product"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-5 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-colors"
            aria-label="Next product"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeSlide ? "bg-orange-500" : "bg-gray-300"}`}
                aria-label={`Go to product ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
