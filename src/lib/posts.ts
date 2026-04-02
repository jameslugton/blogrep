import postsData from '@/content/posts.json'
import { calculateReadTime } from '@/lib/utils'

export interface BlogPost {
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  contentHtml?: string
  readTime: number
}

const posts: BlogPost[] = (postsData as BlogPost[])
  .map((post) => ({
    ...post,
    readTime: post.readTime || calculateReadTime(post.content),
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function listPosts(): BlogPost[] {
  return posts
}

export function listPostSlugs(): string[] {
  return posts.map((post) => post.slug)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}
