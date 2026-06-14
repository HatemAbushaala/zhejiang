import type { Metadata } from "next"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "Zhejiang Jiemai – GERMA Heavy-Duty Chisels & Drill Bits",
  description:
    "Zhejiang Jiemai specializes in electric hammer chisels, pneumatic components, and industrial drill bits under the GERMA and GERMA brands.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
