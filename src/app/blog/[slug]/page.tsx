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
      <main className="min-h-screen py-12">
        <article className="container">
          <div className="mx-auto max-w-3xl rounded-md border border-stone-200 bg-white px-7 py-8 shadow-sm">
            <header className="mb-8 border-b border-stone-200 pb-6">
              <h1 className="text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-4 text-sm uppercase tracking-[0.12em] text-stone-500">
                <time>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</time>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </div>
            </header>

            <div className="prose prose-custom max-w-none text-[1.04rem]">
              {post.contentHtml ? (
                <div className="wp-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              ) : (
                post.content.split('\n\n').map((paragraph: string, i: number) => {
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
                })
              )}
            </div>

            <div className="mt-12 border-t border-stone-200 pt-8">
              <a
                href="/"
                className="font-medium text-amber-900 transition-colors hover:text-amber-700"
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
