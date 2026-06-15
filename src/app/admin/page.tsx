import { getSiteData } from "@/lib/site-cache"
import { AdminPage } from "./_components/admin-page"

export default async function Admin() {
  const data = await getSiteData()
  return <AdminPage initialData={data} />
}
