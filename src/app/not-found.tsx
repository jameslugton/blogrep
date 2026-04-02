'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-600">Page not found</p>
      <Link href="/" className="text-cyan-600 hover:text-cyan-700 font-medium">
        Return home
      </Link>
    </div>
  )
}
