import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import { listPosts } from '@/lib/posts'

const posts = listPosts().map((post) => ({
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  date: post.date,
  readTime: post.readTime,
}))

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <section className="container">
          <div className="mx-auto max-w-3xl rounded-md border border-stone-200 bg-white px-7 py-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-stone-500">Editorial Focus</p>
            <h1 className="mt-3 text-4xl font-semibold text-stone-900 sm:text-5xl">
              Human-Driven Cybersecurity for Safer Digital Life
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-stone-700">
              The Quiet Compromises. Real-world cybersecurity explained through practical stories,
              everyday signals, and habits that keep people safer.
            </p>
          </div>
        </section>

        <section id="latest" className="container mt-10">
          <div className="mx-auto max-w-3xl rounded-md border border-stone-200 bg-white px-7 py-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-stone-900">Latest Articles</h2>
            <div className="mt-7 space-y-6">
              {posts.map((post) => (
                <PostCard key={post.slug} {...post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
