import type { Metadata } from "next"
import { AdminShell } from "./_components/admin-shell"

export const metadata: Metadata = {
  title: "Admin – Zhejiang Jiemai",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
