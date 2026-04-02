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
    <Link href={`/blog/${slug}`} className="group block rounded-sm px-1 py-1 transition-colors hover:bg-stone-50">
      <article className="border-b border-stone-200 pb-6">
        <h3 className="text-2xl font-semibold leading-snug text-stone-900 transition-colors group-hover:text-amber-900">
          {title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-stone-500">
          <time dateTime={date}>{formatDate(date)}</time>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>
        {excerpt && (
          <p className="mt-4 line-clamp-4 text-[1.04rem] leading-relaxed text-stone-700">
            {excerpt}
          </p>
        )}
      </article>
    </Link>
  )
}
