#!/usr/bin/env node

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { XMLParser } from 'fast-xml-parser'

const [, , xmlPathArg] = process.argv

if (!xmlPathArg) {
  console.error('Usage: npm run import:wp:xml -- ./wordpress-export.xml')
  process.exit(1)
}

function decodeHtmlEntities(input) {
  return String(input || '')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, ' -- ')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function htmlToText(html) {
  return decodeHtmlEntities(
    String(html || '')
      .replace(/<\s*br\s*\/?>/gi, '\n')
      .replace(/<\s*\/p\s*>/gi, '\n\n')
      .replace(/<\s*\/h[1-6]\s*>/gi, '\n\n')
      .replace(/<\s*li\s*>/gi, '- ')
      .replace(/<\s*\/li\s*>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim(),
  )
}

function calculateReadTime(text) {
  const wordsPerMinute = 200
  const words = String(text || '').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value
  }
  if (value === undefined || value === null) {
    return []
  }
  return [value]
}

function nodeText(value) {
  if (value === undefined || value === null) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'object' && typeof value.cdata === 'string') {
    return value.cdata
  }
  return String(value)
}

function toIsoDate(value) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) {
    return new Date().toISOString()
  }
  return d.toISOString()
}

function extractPosts(xmlContent) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    cdataPropName: 'cdata',
    parseTagValue: false,
    trimValues: false,
  })

  const doc = parser.parse(xmlContent)
  const items = toArray(doc?.rss?.channel?.item)

  return items
    .filter((item) => nodeText(item?.['wp:post_type']) === 'post')
    .filter((item) => nodeText(item?.['wp:status']) === 'publish')
    .map((item) => {
      const contentHtml = nodeText(item?.['content:encoded']).trim()
      const content = htmlToText(contentHtml)
      const excerpt = htmlToText(nodeText(item?.description)).slice(0, 240)
      const slug = (nodeText(item?.['wp:post_name']) || nodeText(item?.title) || 'post')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

      return {
        title: decodeHtmlEntities(nodeText(item?.title) || 'Untitled'),
        slug: slug || `post-${Math.random().toString(36).slice(2, 10)}`,
        date: toIsoDate(nodeText(item?.['wp:post_date_gmt']) || nodeText(item?.pubDate)),
        excerpt,
        content,
        contentHtml,
        readTime: calculateReadTime(content),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

async function run() {
  const xmlPath = resolve(xmlPathArg)
  const xmlContent = await readFile(xmlPath, 'utf8')
  const posts = extractPosts(xmlContent)

  if (posts.length === 0) {
    console.error('No published posts found in XML file.')
    process.exit(1)
  }

  const outputPath = resolve('src/content/posts.json')
  await mkdir(resolve('src/content'), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(posts, null, 2)}\n`, 'utf8')

  console.log(`Imported ${posts.length} published posts to ${outputPath}`)
}

run().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
