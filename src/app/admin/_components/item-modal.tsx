"use client"

import { useEffect, useState } from "react"
import type { ItemEntry } from "@/lib/site-db"

interface Props {
  item: ItemEntry | null
  onSave: (item: ItemEntry) => void
  onClose: () => void
}

export function ItemModal({ item, onSave, onClose }: Props) {
  const [form, setForm] = useState<ItemEntry>({ id: "", title: "", description: "", image: "" })

  useEffect(() => {
    if (item) {
      setForm(item)
    } else {
      setForm({ id: Date.now().toString(), title: "", description: "", image: "" })
    }
  }, [item])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">{item ? "Edit Item" : "Add Item"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
            <input
              required
              type="url"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
            />
          </div>
          {form.image && (
            <img src={form.image} alt="preview" className="w-full h-32 object-cover rounded-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
          )}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 text-gray-700 font-medium py-2 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg text-sm transition-colors">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
