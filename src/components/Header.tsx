'use client'

export default function Header() {
  return (
    <header className="border-y border-stone-300 bg-stone-100/95 backdrop-blur-sm">
      <div className="container">
        <div className="flex flex-col gap-4 py-5 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-2xl font-semibold leading-tight text-stone-900 transition-colors hover:text-stone-700">
              Human-Driven Cybersecurity for Safer Digital Life
            </a>
          </div>
          <nav className="flex items-center gap-6 text-sm uppercase tracking-[0.14em] text-stone-600">
            <a href="/" className="transition-colors hover:text-stone-900">
              Home
            </a>
            <a href="/#latest" className="transition-colors hover:text-stone-900">
              Latest
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
