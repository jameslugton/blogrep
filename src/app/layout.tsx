import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Human-Driven Cybersecurity for Safer Digital Life',
  description: 'The Quiet Compromises',
  authors: [{ name: 'James Lugton', url: 'https://james.lugton.co.uk' }],
  openGraph: {
    title: 'Human-Driven Cybersecurity for Safer Digital Life',
    description: 'The Quiet Compromises',
    type: 'website',
    url: 'https://james.lugton.co.uk',
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
