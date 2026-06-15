import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function POST() {
  revalidateTag("site-data", { expire: 0 })
  revalidatePath("/")
  return NextResponse.json({ revalidated: true })
}
