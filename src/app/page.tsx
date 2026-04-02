import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'

const posts = [
  {
    title: 'Getting Started with Next.js and Cloudflare',
    slug: 'nextjs-cloudflare-guide',
    excerpt: 'Learn how to deploy a modern Next.js application on Cloudflare Pages for lightning-fast performance.',
    date: '2024-04-01',
    readTime: 8,
  },
  {
    title: 'The Art of Typography in Web Design',
    slug: 'typography-web-design',
    excerpt: 'Explore best practices for choosing and implementing typography that enhances user experience and readability.',
    date: '2024-03-28',
    readTime: 6,
  },
  {
    title: 'Building Performant Web Applications',
    slug: 'performant-web-apps',
    excerpt: 'Strategies and techniques for optimizing web application performance and improving Core Web Vitals.',
    date: '2024-03-25',
    readTime: 10,
  },
]

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Em—Dash
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A modern blog exploring design, development, and the intersection of technology and creativity.
            </p>
            <div className="flex gap-4">
              <a
                href="#blog"
                className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
              >
                Read Articles
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:border-gray-900 transition-colors font-medium"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="container py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container py-16 border-t border-gray-200">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About this Blog</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              EmDash is a space dedicated to exploring modern web development, design principles, and the ideas that shape our digital world.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're interested in the latest web technologies, design thinking, or best practices in development, you'll find thoughtful articles and insights here.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
