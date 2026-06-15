export async function revalidateSite() {
  try {
    await fetch("/api/revalidate", { method: "POST" })
  } catch {
    // best-effort
  }
}
