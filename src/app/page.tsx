import { getSiteData } from "@/lib/site-cache"
import { Navbar } from "@/app/_components/navbar"
import { Hero } from "@/app/_components/hero"
import { About } from "@/app/_components/about"
import { ProductsCarousel } from "@/app/_components/products-carousel"
import { Services } from "@/app/_components/services"
import { ContactSection } from "@/app/_components/contact-section"
import { SiteFooter } from "@/app/_components/site-footer"

export default async function Home() {
  const data = await getSiteData()

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden" dir="ltr">
      <Navbar navbar={data.navbar} />
      <Hero hero={data.hero} />
      <About about={data.about} />
      <ProductsCarousel products={data.products} />
      <Services services={data.services} />
      <ContactSection contact={data.contact} />
      <SiteFooter navbar={data.navbar} contact={data.contact} footer={data.footer} />
    </div>
  )
}
