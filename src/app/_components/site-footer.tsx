import Image from "next/image"
import type { SiteData } from "@/lib/site-db"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
]

export function SiteFooter({ navbar, contact, footer }: { navbar: SiteData["navbar"]; contact: SiteData["contact"]; footer: SiteData["footer"] }) {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src={navbar.logo} alt={`${navbar.companyName} Logo`} width={32} height={32} className="object-contain" />
              <span className="text-white font-bold">{navbar.companyName}</span>
            </div>
            <p className="text-sm leading-relaxed">{footer.description}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-orange-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>{contact.phone}</li>
              <li>{contact.email}</li>
              <li>{contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">{footer.copyright}</div>
      </div>
    </footer>
  )
}
