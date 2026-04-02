'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-14 border-t border-stone-300 bg-stone-100">
      <div className="container py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg font-medium text-stone-900">The Quiet Compromises</p>
          <p className="mt-2 text-stone-600">Practical cybersecurity stories for everyday digital life.</p>
          <p className="mt-5 text-sm text-stone-500">© {currentYear} James Lugton. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
