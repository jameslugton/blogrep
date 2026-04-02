import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getPostBySlug, listPostSlugs } from '@/lib/posts'

export async function generateStaticParams() {
  return listPostSlugs().map((slug) => ({
    slug,
  }))
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return (
      <>
        <Header />
        <main className="container py-16">
          <h1 className="text-3xl font-bold text-gray-900">Post not found</h1>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <article className="container py-12">
          <div className="max-w-2xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 text-sm">
                <time>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</time>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </div>
            </header>

            <div className="prose prose-custom max-w-none">
              {post.content.split('\n\n').map((paragraph: string, i: number) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('`')) {
                  return (
                    <pre key={i} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                      <code>{paragraph}</code>
                    </pre>
                  )
                }
                return (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                )
              })}
            </div>

            <div className="border-t border-gray-200 mt-12 pt-8">
              <a
                href="/"
                className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
              >
                ← Back to home
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
