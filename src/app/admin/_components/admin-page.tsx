"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { useAuth } from "@/lib/auth"
import { updateSiteSection, importSiteData, type SiteData, type ItemEntry } from "@/lib/site-db"
import { revalidateSite } from "@/lib/revalidate"
import { ItemModal } from "./item-modal"

// ── helpers ──────────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  const cls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-orange-400 bg-white"
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={`${cls} resize-none`} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  )
}

function SectionCard({
  title,
  children,
  onSave,
  saving,
}: {
  title: string
  children: React.ReactNode
  onSave: () => void
  saving: boolean
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      <h2 className="font-semibold text-gray-900 text-base">{title}</h2>
      {children}
      <div className="flex justify-end pt-2">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────

export function AdminPage({ initialData }: { initialData: SiteData }) {
  const { user, logout } = useAuth()
  const [data, setData] = useState<SiteData>(initialData)
  const [saving, setSaving] = useState<Partial<Record<keyof SiteData, boolean>>>({})

  // item modal state
  const [modalSection, setModalSection] = useState<"products" | "services" | null>(null)
  const [editItem, setEditItem] = useState<ItemEntry | null>(null)
  const importRef = useRef<HTMLInputElement>(null)

  function set<K extends keyof SiteData>(section: K, value: SiteData[K]) {
    setData((d) => ({ ...d, [section]: value }))
  }

  async function save(section: keyof SiteData) {
    setSaving((s) => ({ ...s, [section]: true }))
    try {
      await updateSiteSection(section, data[section])
      await revalidateSite()
      toast.success("Saved")
    } catch {
      toast.error("Failed to save")
    } finally {
      setSaving((s) => ({ ...s, [section]: false }))
    }
  }

  // ── items (products / services) ────────────────────────────────────────────

  function openAdd(section: "products" | "services") {
    setEditItem(null)
    setModalSection(section)
  }

  function openEdit(section: "products" | "services", item: ItemEntry) {
    setEditItem(item)
    setModalSection(section)
  }

  async function handleItemSave(item: ItemEntry) {
    if (!modalSection) return
    const list = data[modalSection]
    const idx = list.findIndex((i) => i.id === item.id)
    const updated = idx >= 0 ? list.map((i) => (i.id === item.id ? item : i)) : [...list, item]
    set(modalSection, updated as SiteData[typeof modalSection])
    setModalSection(null)

    setSaving((s) => ({ ...s, [modalSection]: true }))
    try {
      await updateSiteSection(modalSection, updated)
      await revalidateSite()
      toast.success("Saved")
    } catch {
      toast.error("Failed to save")
    } finally {
      setSaving((s) => ({ ...s, [modalSection]: false }))
    }
  }

  async function deleteItem(section: "products" | "services", id: string) {
    const updated = data[section].filter((i) => i.id !== id)
    set(section, updated as SiteData[typeof section])
    setSaving((s) => ({ ...s, [section]: true }))
    try {
      await updateSiteSection(section, updated)
      await revalidateSite()
      toast.success("Deleted")
    } catch {
      toast.error("Failed to delete")
    } finally {
      setSaving((s) => ({ ...s, [section]: false }))
    }
  }

  // ── import / export ────────────────────────────────────────────────────────

  function handleExport() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "zhejiang-site-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const imported = JSON.parse(text) as SiteData
      await importSiteData(imported)
      setData(imported)
      await revalidateSite()
      toast.success("Data imported successfully")
    } catch {
      toast.error("Invalid JSON file")
    } finally {
      e.target.value = ""
    }
  }

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={data.navbar.logo}
              alt="logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-semibold text-gray-900 text-sm">Zhejiang Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-xs text-gray-500 hover:text-orange-500 transition-colors">View Site ↗</a>
            <span className="text-xs text-gray-400">{user?.email}</span>
            <button onClick={logout} className="text-xs text-gray-500 hover:text-red-500 transition-colors">Sign out</button>
          </div>
        </div>
      </header>

      {/* content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Site Content</h1>
          <div className="flex gap-2">
            <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
            <button onClick={() => importRef.current?.click()} className="border border-gray-200 text-gray-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Import JSON
            </button>
            <button onClick={handleExport} className="border border-gray-200 text-gray-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Export JSON
            </button>
          </div>
        </div>

        {/* Navbar */}
        <SectionCard title="Navbar" onSave={() => save("navbar")} saving={!!saving.navbar}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Company Name" value={data.navbar.companyName} onChange={(v) => set("navbar", { ...data.navbar, companyName: v })} />
            <Field label="WhatsApp Link" value={data.navbar.whatsappLink} onChange={(v) => set("navbar", { ...data.navbar, whatsappLink: v })} />
          </div>
          <Field label="Logo URL" value={data.navbar.logo} onChange={(v) => set("navbar", { ...data.navbar, logo: v })} />
        </SectionCard>

        {/* Hero */}
        <SectionCard title="Hero" onSave={() => save("hero")} saving={!!saving.hero}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Tag line" value={data.hero.tag} onChange={(v) => set("hero", { ...data.hero, tag: v })} />
            <Field label="Title" value={data.hero.title} onChange={(v) => set("hero", { ...data.hero, title: v })} />
            <Field label="Title Highlight" value={data.hero.titleHighlight} onChange={(v) => set("hero", { ...data.hero, titleHighlight: v })} />
            <Field label="Subtitle" value={data.hero.subtitle} onChange={(v) => set("hero", { ...data.hero, subtitle: v })} />
            <Field label="CTA Primary" value={data.hero.ctaPrimary} onChange={(v) => set("hero", { ...data.hero, ctaPrimary: v })} />
            <Field label="CTA Secondary" value={data.hero.ctaSecondary} onChange={(v) => set("hero", { ...data.hero, ctaSecondary: v })} />
          </div>
          <Field label="Description" value={data.hero.description} onChange={(v) => set("hero", { ...data.hero, description: v })} multiline />
          <Field label="Background Image URL" value={data.hero.bgImage} onChange={(v) => set("hero", { ...data.hero, bgImage: v })} />
        </SectionCard>

        {/* About */}
        <SectionCard title="About" onSave={() => save("about")} saving={!!saving.about}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Tag" value={data.about.tag} onChange={(v) => set("about", { ...data.about, tag: v })} />
            <Field label="Title" value={data.about.title} onChange={(v) => set("about", { ...data.about, title: v })} />
          </div>
          <Field label="Image URL" value={data.about.image} onChange={(v) => set("about", { ...data.about, image: v })} />
          <Field label="Paragraph 1" value={data.about.description1} onChange={(v) => set("about", { ...data.about, description1: v })} multiline />
          <Field label="Paragraph 2" value={data.about.description2} onChange={(v) => set("about", { ...data.about, description2: v })} multiline />
          <Field label="Paragraph 3" value={data.about.description3} onChange={(v) => set("about", { ...data.about, description3: v })} multiline />
        </SectionCard>

        {/* Products */}
        <ItemsSection
          title="Products"
          items={data.products}
          saving={!!saving.products}
          onAdd={() => openAdd("products")}
          onEdit={(item) => openEdit("products", item)}
          onDelete={(id) => deleteItem("products", id)}
        />

        {/* Services */}
        <ItemsSection
          title="Services"
          items={data.services}
          saving={!!saving.services}
          onAdd={() => openAdd("services")}
          onEdit={(item) => openEdit("services", item)}
          onDelete={(id) => deleteItem("services", id)}
        />

        {/* Contact */}
        <SectionCard title="Contact" onSave={() => save("contact")} saving={!!saving.contact}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Phone" value={data.contact.phone} onChange={(v) => set("contact", { ...data.contact, phone: v })} />
            <Field label="Email" value={data.contact.email} onChange={(v) => set("contact", { ...data.contact, email: v })} />
            <Field label="WhatsApp URL" value={data.contact.whatsapp} onChange={(v) => set("contact", { ...data.contact, whatsapp: v })} />
            <Field label="Address" value={data.contact.address} onChange={(v) => set("contact", { ...data.contact, address: v })} />
          </div>
          <Field label="Partner Note" value={data.contact.partnerNote} onChange={(v) => set("contact", { ...data.contact, partnerNote: v })} multiline />
        </SectionCard>

        {/* Footer */}
        <SectionCard title="Footer" onSave={() => save("footer")} saving={!!saving.footer}>
          <Field label="Description" value={data.footer.description} onChange={(v) => set("footer", { ...data.footer, description: v })} multiline />
          <Field label="Copyright" value={data.footer.copyright} onChange={(v) => set("footer", { ...data.footer, copyright: v })} />
        </SectionCard>
      </main>

      {/* modal */}
      {modalSection && (
        <ItemModal
          item={editItem}
          onSave={handleItemSave}
          onClose={() => setModalSection(null)}
        />
      )}
    </div>
  )
}

function ItemsSection({
  title,
  items,
  saving,
  onAdd,
  onEdit,
  onDelete,
}: {
  title: string
  items: ItemEntry[]
  saving: boolean
  onAdd: () => void
  onEdit: (item: ItemEntry) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 text-base">{title}</h2>
        <button onClick={onAdd} className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors">
          + Add
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
            <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
              <p className="text-xs text-gray-500 truncate">{item.description}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => onEdit(item)} className="text-xs text-gray-500 hover:text-orange-500 transition-colors px-2 py-1 rounded-md hover:bg-orange-50">
                Edit
              </button>
              <button onClick={() => onDelete(item.id)} className="text-xs text-gray-500 hover:text-red-500 transition-colors px-2 py-1 rounded-md hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No items yet. Add one.</p>}
      </div>

      {saving && <p className="text-xs text-orange-500 text-right">Saving…</p>}
    </div>
  )
}
