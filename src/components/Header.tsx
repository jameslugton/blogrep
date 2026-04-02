'use client'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="text-2xl font-bold text-gray-900 hover:text-cyan-600 transition-colors">
              Em—Dash
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#blog" className="text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
