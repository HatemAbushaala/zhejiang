import { getSiteData } from "@/lib/site-db"

export const dynamic = "force-dynamic"
import { AdminPage } from "./_components/admin-page"

export default async function Admin() {
  const data = await getSiteData()
  return <AdminPage initialData={data} />
}
