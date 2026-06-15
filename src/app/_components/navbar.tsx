"use client"

import Image from "next/image"
import { useState } from "react"
import { MenuIcon, XIcon, WhatsAppIcon } from "@/app/_components/site-icons"
import type { SiteData } from "@/lib/site-db"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
]

export function Navbar({ navbar }: { navbar: SiteData["navbar"] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2">
          <Image src={navbar.logo} alt={`${navbar.companyName} Logo`} width={40} height={40} className="object-contain" />
          <span className="font-bold text-gray-900 text-lg">{navbar.companyName}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={navbar.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
        >
          <WhatsAppIcon className="text-white" />
          Contact Us
        </a>

        <button className="md:hidden p-2 rounded text-gray-700" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-orange-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href={navbar.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full"
          >
            Contact Us
          </a>
        </div>
      )}
    </header>
  )
}
