'use client'

import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  title: string
  slug: string
  excerpt: string
  date: string
  readTime: number
}

export default function PostCard({
  title,
  slug,
  excerpt,
  date,
  readTime,
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-cyan-300 transition-all duration-300 cursor-pointer h-full">
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          <time dateTime={date}>{formatDate(date)}</time>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-cyan-600">
          {title}
        </h3>
        <p className="text-gray-600 line-clamp-3">
          {excerpt}
        </p>
      </article>
    </Link>
  )
}
