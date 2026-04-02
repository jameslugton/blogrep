import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Sample blog post data
const posts: Record<string, any> = {
  'nextjs-cloudflare-guide': {
    title: 'Getting Started with Next.js and Cloudflare',
    date: '2024-04-01',
    readTime: 8,
    content: `Cloudflare Pages offers an excellent hosting solution for modern web applications. When combined with Next.js, you get a powerful, scalable platform for deploying your projects.

## Why Choose Cloudflare Pages?

Cloudflare Pages provides:
- Global edge network for lightning-fast content delivery
- Zero-configuration deployments
- Unlimited bandwidth
- Built-in DDoS protection
- Seamless Git integration

## Setting Up Your Project

To get started, ensure your Next.js project is configured for static export:

\`\`\`javascript
export const config = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
\`\`\`

## Deployment

Simply connect your GitHub repository to Cloudflare Pages, and your site will be deployed automatically on every push to your main branch.

The process is incredibly straightforward and removes friction from your deployment workflow.`,
  },
  'typography-web-design': {
    title: 'The Art of Typography in Web Design',
    date: '2024-03-28',
    readTime: 6,
    content: `Typography is one of the most overlooked yet powerful tools in web design. The right typeface and spacing can transform a website from average to exceptional.

## Choosing the Right Typeface

When selecting fonts for your website, consider:
- Readability: Ensure the font is legible at various sizes
- Brand Alignment: Does it match your brand personality?
- Performance: Limit the number of font weights and variants loaded
- Fallbacks: Always include system font stack fallbacks

## Hierarchy and Spacing

Web typography is more than just picking a pretty font. It's about creating visual hierarchy that guides the reader through the content. Use different sizes, weights, and colors to establish importance.

Line height and letter spacing are equally important. A well-spaced page is easier to read and more visually appealing than cramped text.

## Modern Font Stacks

Consider using modern font stacks that balance aesthetics with performance:
- System fonts for fastest performance
- Variable fonts for flexibility
- Google Fonts for additional options with good CDN support`,
  },
  'performant-web-apps': {
    title: 'Building Performant Web Applications',
    date: '2024-03-25',
    readTime: 10,
    content: `Performance is a feature. Users expect fast, responsive web applications, and slow sites lead to lost traffic and engagement.

## Core Web Vitals

Google's Core Web Vitals are metrics you should optimize for:
- Largest Contentful Paint (LCP): How quickly the main content loads
- First Input Delay (FID): How responsive the app is to user interactions
- Cumulative Layout Shift (CLS): Visual stability during loading

## Optimization Strategies

1. **Code Splitting**: Load only the code needed for each page
2. **Image Optimization**: Use modern formats and responsive images
3. **Caching**: Leverage browser caching and CDN edges
4. **Minification**: Reduce file sizes through minification and compression
5. **Server-Side Rendering**: When appropriate, render on the server for faster initial page load

## Monitoring Performance

Use tools like:
- Lighthouse for performance audits
- WebPageTest for detailed analysis
- Core Web Vitals dashboard in Google Search Console
- Real User Monitoring (RUM) tools for production data

Performance optimization is an ongoing process, not a one-time task.`,
  },
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({
    slug,
  }))
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]

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
