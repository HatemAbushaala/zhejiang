"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
];

const PRODUCTS = [
  {
    title: "SDS Plus & Square Shank Chisels",
    description:
      "Designed for light-to-medium demolition tasks. Compatible with most rotary hammer drills, offering excellent precision and durability for everyday construction work.",
    image: "https://api.verdev.app/uploads/blob_b71da7fd1c.jpeg",
  },
  {
    title: "Hex & SDS Max Shank Chisels",
    description:
      "Built for heavy demolition applications. High-torque shank design withstands the most demanding construction and excavation environments.",
    image:
      "https://api.verdev.app/uploads/Screenshot_2026_06_12_195845_e8382dddc1.png",
  },
  {
    title: "Imported Spring Steel & Pneumatic Series",
    description:
      "Manufactured with premium imported spring steel for superior shock absorption. Ideal for pneumatic hammers and high-frequency impact applications.",
    image:
      "https://api.verdev.app/uploads/Screenshot_2026_06_12_200131_26a1f1cab1.png",
  },
  {
    title: "Specialty Tools, Hole Saws & Triangle Drills",
    description:
      "Precision-engineered specialty tools for targeted applications. Includes hole saws and triangle drill bits for accurate, clean cuts in concrete and masonry.",
    image:
      "https://api.verdev.app/uploads/Screenshot_2026_06_12_200407_8140a3ab5f.png",
  },
];

const SERVICES = [
  {
    title: "OEM/ODM Hardware Customization",
    description:
      "We offer full OEM and ODM capabilities, enabling partners to develop branded product lines with custom specifications, markings, and packaging.",
    image:
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600&q=80",
  },
  {
    title: "High-Volume Supply Chain Distribution",
    description:
      "Our distribution network supports global wholesale demand with reliable lead times, bulk pricing tiers, and streamlined logistics solutions.",
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80",
  },
  {
    title: "Metallurgical Quality Testing",
    description:
      "Every batch undergoes rigorous metallurgical testing including hardness verification, tensile strength analysis, and fatigue resistance protocols.",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80",
  },
  {
    title: "Technical Asset Assistance",
    description:
      "Our technical team provides consultation on tool selection, application guidance, and after-sales support to maximize performance in the field.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prevSlide = () =>
    setActiveSlide((p) => (p - 1 + PRODUCTS.length) % PRODUCTS.length);
  const nextSlide = () =>
    setActiveSlide((p) => (p + 1) % PRODUCTS.length);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const els = (e.target as HTMLFormElement).elements;
    const body = {
      name: (els[0] as HTMLInputElement).value,
      email: (els[1] as HTMLInputElement).value,
      message: (els[2] as HTMLInputElement).value,
    };

    try {
      const response = await fetch("https://api.verdev.app/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        toast.error("An error occurred! Please try again later.");
        setIsSubmitting(false);
        return;
      }

      const json = await response.json();

      if (json.success) {
        toast.success(json.message ?? "Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(json.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("An error occurred! Please try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen" dir="ltr">
      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <Image
              src="https://api.verdev.app/uploads/Gemini_Generated_Image_gcahaqgcahaqgcah_39baea28db.png"
              alt="Zhejiang Jiemai Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-bold text-gray-900 text-lg">
              Zhejiang Jiemai
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="https://wa.me/13970167166"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Contact Us
          </a>

          <button
            className="md:hidden p-2 rounded text-gray-700"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
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
              href="https://wa.me/13970167166"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full"
            >
              Contact Us
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden pt-16"
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&q=80"
            alt="Industrial tools background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-orange-400 uppercase tracking-widest text-sm font-semibold mb-4">
            Professional Industrial Tools
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            GERVA Heavy-Duty
            <br />
            <span className="text-orange-400">Chisels &amp; Drill Bits</span>
          </h1>
          <p className="text-xl sm:text-2xl font-light text-gray-200 mb-4">
            Built for Strength, Engineered for Precision
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Zhejiang Jiemai specializes in electric hammer chisels, pneumatic
            components, and industrial drill bits — manufactured with premium
            imported spring steel and hardened alloy tips for superior
            performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-colors text-sm"
            >
              Contact Us
            </a>
            <a
              href="#products"
              className="border border-white text-white hover:bg-white/10 font-bold px-8 py-3 rounded-full transition-colors text-sm"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDownIcon className="text-white/60 w-6 h-6" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-50 flex items-center justify-center">
              <Image
                src="https://api.verdev.app/uploads/Gemini_Generated_Image_gcahaqgcahaqgcah_39baea28db.png"
                alt="Zhejiang Jiemai"
                fill
                className="object-contain p-8"
              />
            </div>

            <div>
              <p className="text-orange-500 uppercase tracking-widest text-xs font-semibold mb-3">
                Who We Are
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                About Zhejiang Jiemai
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Zhejiang Jiemai is a leading manufacturer and exporter of
                standard and heavy-duty demolition attachments, operating under
                the trusted <strong>GERMA</strong> and <strong>GERVA</strong>{" "}
                brands. We serve construction professionals and industrial
                distributors across the globe.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our products leverage advanced metallurgy — combining
                high-carbon spring steel with precision heat treatment — to
                deliver exceptional torque resistance, fatigue life, and impact
                energy transfer in the most demanding construction and excavation
                environments.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Based in Yiwu, China, we combine scale manufacturing with
                meticulous quality control to supply reliable, cost-effective
                tooling solutions to wholesale partners worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-orange-500 uppercase tracking-widest text-xs font-semibold mb-3">
              What We Make
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Our Professional Catalog
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              High-Impact Tools For Every Shank Standard
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={PRODUCTS[activeSlide].image}
                    alt={PRODUCTS[activeSlide].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider mb-2">
                    Product {activeSlide + 1} of {PRODUCTS.length}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {PRODUCTS[activeSlide].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {PRODUCTS[activeSlide].description}
                  </p>
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
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Previous product"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Next product"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === activeSlide ? "bg-orange-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to product ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-orange-500 uppercase tracking-widest text-xs font-semibold mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Manufacturing Excellence
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Supporting Global Demands
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.title}
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
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-orange-400 uppercase tracking-widest text-xs font-semibold mb-3">
              Work With Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Partner With Us
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Get a Custom Wholesale Quote
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6 text-orange-400">
                  Get In Touch
                </h3>
                <div className="space-y-4">
                  <ContactRow
                    icon={<PhoneIcon />}
                    label="Phone"
                    value="+1 39 7016 7166"
                    href="tel:+13970167166"
                  />
                  <ContactRow
                    icon={<EmailIcon />}
                    label="Email"
                    value="270027768@qq.com"
                    href="mailto:270027768@qq.com"
                  />
                  <ContactRow
                    icon={<LocationIcon />}
                    label="Address"
                    value="Gate 27, Zone 2, Yiwu, China"
                  />
                  <ContactRow
                    icon={<WhatsAppIcon className="text-green-400" />}
                    label="WhatsApp"
                    value="+1 39 7016 7166"
                    href="https://wa.me/13970167166"
                  />
                </div>
              </div>

              <div className="bg-gray-800 rounded-2xl p-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                  We work with wholesale distributors, construction firms, and
                  OEM partners worldwide. Reach out to discuss bulk pricing,
                  custom branding, or technical specifications.
                </p>
              </div>
            </div>

            <div>
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-gray-800 rounded-2xl p-8"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
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

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="https://api.verdev.app/uploads/Gemini_Generated_Image_gcahaqgcahaqgcah_39baea28db.png"
                  alt="Zhejiang Jiemai Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="text-white font-bold">Zhejiang Jiemai</span>
              </div>
              <p className="text-sm leading-relaxed">
                Premium industrial tooling manufacturer under the GERMA and
                GERVA brands. Serving global wholesale partners from Yiwu,
                China.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>+1 39 7016 7166</li>
                <li>270027768@qq.com</li>
                <li>Gate 27, Zone 2, Yiwu, China</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            &copy; 2026 Zhejiang Jiemai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sub-components ── */

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="text-orange-400 mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-white text-sm">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {inner}
      </a>
    );
  }
  return inner;
}

/* ── Icons ── */

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.06 7.83a16 16 0 006.11 6.11l1.19-1.19a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15v1.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

