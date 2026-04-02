'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-600 text-sm">
              EmDash is a modern blog exploring design, development, and ideas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <p className="text-gray-600 text-sm">
              Reach out on social or via email.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600 text-sm">
            © {currentYear} EmDash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
