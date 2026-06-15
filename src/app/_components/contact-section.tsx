"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PhoneIcon, EmailIcon, LocationIcon, WhatsAppIcon } from "@/app/_components/site-icons"
import type { SiteData } from "@/lib/site-db"

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="text-orange-400 mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-white text-sm">{value}</p>
      </div>
    </div>
  )
  if (href) return <a href={href} className="block hover:opacity-80 transition-opacity">{inner}</a>
  return inner
}

export function ContactSection({ contact }: { contact: SiteData["contact"] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const els = (e.target as HTMLFormElement).elements
    const body = {
      name: (els[0] as HTMLInputElement).value,
      email: (els[1] as HTMLInputElement).value,
      message: (els[2] as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch("https://api.verdev.app/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        toast.error(json.message ?? "Something went wrong.")
      } else {
        toast.success(json.message ?? "Message sent successfully!")
        ;(e.target as HTMLFormElement).reset()
      }
    } catch {
      toast.error("An error occurred! Please try again later.")
    }
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-orange-400 uppercase tracking-widest text-xs font-semibold mb-3">Work With Us</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Partner With Us</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Get a Custom Wholesale Quote</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-400">Get In Touch</h3>
              <div className="space-y-4">
                <ContactRow icon={<PhoneIcon />} label="Phone" value={contact.phone} href={`tel:${contact.phone.replace(/\s/g, "")}`} />
                <ContactRow icon={<EmailIcon />} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
                <ContactRow icon={<LocationIcon />} label="Address" value={contact.address} />
                <ContactRow icon={<WhatsAppIcon className="text-green-400" />} label="WhatsApp" value={contact.phone} href={contact.whatsapp} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6">
              <p className="text-gray-300 text-sm leading-relaxed">{contact.partnerNote}</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-5 bg-gray-800 rounded-2xl p-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Describe your requirements, quantities, or questions..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors text-sm"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
