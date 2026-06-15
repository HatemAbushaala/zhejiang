import { cacheTag, cacheLife } from "next/cache"
import { fetchSiteData, type SiteData } from "@/lib/site-db"

export async function getSiteData(): Promise<SiteData> {
  "use cache"
  cacheTag("site-data")
  cacheLife("seconds")
  return fetchSiteData()
}
