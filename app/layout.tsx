import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Health Insurance Comparison Tool',
  description: 'Compare health insurance plans and estimate your annual costs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
