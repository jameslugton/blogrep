import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'EmDash — A Modern Blog',
  description: 'Thoughts on design, development, and digital innovation.',
  authors: [{ name: 'EmDash', url: 'https://example.com' }],
  openGraph: {
    title: 'EmDash — A Modern Blog',
    description: 'Thoughts on design, development, and digital innovation.',
    type: 'website',
    url: 'https://example.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
