import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase-config"

export interface ItemEntry {
  id: string
  title: string
  description: string
  image: string
}

export interface SiteData {
  navbar: {
    companyName: string
    logo: string
    whatsappLink: string
  }
  hero: {
    tag: string
    title: string
    titleHighlight: string
    subtitle: string
    description: string
    bgImage: string
    ctaPrimary: string
    ctaSecondary: string
  }
  about: {
    tag: string
    title: string
    image: string
    description1: string
    description2: string
    description3: string
  }
  products: ItemEntry[]
  services: ItemEntry[]
  contact: {
    phone: string
    whatsapp: string
    email: string
    address: string
    partnerNote: string
  }
  footer: {
    description: string
    copyright: string
  }
}

export const DEFAULT_SITE_DATA: SiteData = {
  navbar: {
    companyName: "Zhejiang Jiemai",
    logo: "https://api.verdev.app/uploads/Gemini_Generated_Image_gcahaqgcahaqgcah_39baea28db.png",
    whatsappLink: "https://wa.me/13970167166",
  },
  hero: {
    tag: "Professional Industrial Tools",
    title: "GERMA Heavy-Duty",
    titleHighlight: "Chisels & Drill Bits",
    subtitle: "Built for Strength, Engineered for Precision",
    description:
      "Zhejiang Jiemai specializes in electric hammer chisels, pneumatic components, and industrial drill bits — manufactured with premium imported spring steel and hardened alloy tips for superior performance.",
    bgImage: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&q=80",
    ctaPrimary: "Contact Us",
    ctaSecondary: "Learn More",
  },
  about: {
    tag: "Who We Are",
    title: "About Zhejiang Jiemai",
    image: "https://api.verdev.app/uploads/Gemini_Generated_Image_gcahaqgcahaqgcah_39baea28db.png",
    description1:
      "Zhejiang Jiemai is a leading manufacturer and exporter of standard and heavy-duty demolition attachments, operating under the trusted GERMA and GERMA brands. We serve construction professionals and industrial distributors across the globe.",
    description2:
      "Our products leverage advanced metallurgy — combining high-carbon spring steel with precision heat treatment — to deliver exceptional torque resistance, fatigue life, and impact energy transfer in the most demanding construction and excavation environments.",
    description3:
      "Based in Yiwu, China, we combine scale manufacturing with meticulous quality control to supply reliable, cost-effective tooling solutions to wholesale partners worldwide.",
  },
  products: [
    {
      id: "1",
      title: "SDS Plus & Square Shank Chisels",
      description:
        "Designed for light-to-medium demolition tasks. Compatible with most rotary hammer drills, offering excellent precision and durability for everyday construction work.",
      image: "https://api.verdev.app/uploads/blob_b71da7fd1c.jpeg",
    },
    {
      id: "2",
      title: "Hex & SDS Max Shank Chisels",
      description:
        "Built for heavy demolition applications. High-torque shank design withstands the most demanding construction and excavation environments.",
      image: "https://api.verdev.app/uploads/Screenshot_2026_06_12_195845_e8382dddc1.png",
    },
    {
      id: "3",
      title: "Imported Spring Steel & Pneumatic Series",
      description:
        "Manufactured with premium imported spring steel for superior shock absorption. Ideal for pneumatic hammers and high-frequency impact applications.",
      image: "https://api.verdev.app/uploads/Screenshot_2026_06_12_200131_26a1f1cab1.png",
    },
    {
      id: "4",
      title: "Specialty Tools, Hole Saws & Triangle Drills",
      description:
        "Precision-engineered specialty tools for targeted applications. Includes hole saws and triangle drill bits for accurate, clean cuts in concrete and masonry.",
      image: "https://api.verdev.app/uploads/Screenshot_2026_06_12_200407_8140a3ab5f.png",
    },
  ],
  services: [
    {
      id: "1",
      title: "OEM/ODM Hardware Customization",
      description:
        "We offer full OEM and ODM capabilities, enabling partners to develop branded product lines with custom specifications, markings, and packaging.",
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600&q=80",
    },
    {
      id: "2",
      title: "High-Volume Supply Chain Distribution",
      description:
        "Our distribution network supports global wholesale demand with reliable lead times, bulk pricing tiers, and streamlined logistics solutions.",
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80",
    },
    {
      id: "3",
      title: "Metallurgical Quality Testing",
      description:
        "Every batch undergoes rigorous metallurgical testing including hardness verification, tensile strength analysis, and fatigue resistance protocols.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80",
    },
    {
      id: "4",
      title: "Technical Asset Assistance",
      description:
        "Our technical team provides consultation on tool selection, application guidance, and after-sales support to maximize performance in the field.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    },
  ],
  contact: {
    phone: "+1 39 7016 7166",
    whatsapp: "https://wa.me/13970167166",
    email: "270027768@qq.com",
    address: "Gate 27, Zone 2, Yiwu, China",
    partnerNote:
      "We work with wholesale distributors, construction firms, and OEM partners worldwide. Reach out to discuss bulk pricing, custom branding, or technical specifications.",
  },
  footer: {
    description: "Premium industrial tooling manufacturer under the GERMA and GERMA brands. Serving global wholesale partners from Yiwu, China.",
    copyright: "© 2026 Zhejiang Jiemai. All rights reserved.",
  },
}

function siteDoc() {
  return doc(db, "config", "site")
}

function mergeWithDefaults(data: Record<string, unknown>): SiteData {
  return {
    navbar: { ...DEFAULT_SITE_DATA.navbar, ...(data.navbar as object) },
    hero: { ...DEFAULT_SITE_DATA.hero, ...(data.hero as object) },
    about: { ...DEFAULT_SITE_DATA.about, ...(data.about as object) },
    products: Array.isArray(data.products) ? data.products : DEFAULT_SITE_DATA.products,
    services: Array.isArray(data.services) ? data.services : DEFAULT_SITE_DATA.services,
    contact: { ...DEFAULT_SITE_DATA.contact, ...(data.contact as object) },
    footer: { ...DEFAULT_SITE_DATA.footer, ...(data.footer as object) },
  }
}

export async function fetchSiteData(): Promise<SiteData> {
  const snap = await getDoc(siteDoc())
  if (!snap.exists()) return DEFAULT_SITE_DATA
  return mergeWithDefaults(snap.data() as Record<string, unknown>)
}

export async function updateSiteSection(section: keyof SiteData, value: unknown): Promise<void> {
  const flat: Record<string, unknown> = { updatedAt: serverTimestamp() }
  if (Array.isArray(value)) {
    flat[section] = value
  } else if (typeof value === "object" && value !== null) {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      flat[`${section}.${k}`] = v
    }
  }
  try {
    await updateDoc(siteDoc(), flat)
  } catch {
    await setDoc(siteDoc(), { [section]: value, updatedAt: serverTimestamp() })
  }
}

export async function importSiteData(data: SiteData): Promise<void> {
  await setDoc(siteDoc(), { ...data, updatedAt: serverTimestamp() })
}
