#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const [, , wpBaseUrl] = process.argv

if (!wpBaseUrl) {
  console.error('Usage: npm run import:wp -- https://your-site.com')
  process.exit(1)
}

const normalizedBase = wpBaseUrl.replace(/\/$/, '')
const endpoint = `${normalizedBase}/wp-json/wp/v2/posts`
const wpUsername = process.env.WP_USERNAME
const wpAppPassword = process.env.WP_APP_PASSWORD

function buildHeaders() {
  const headers = {
    Accept: 'application/json',
    'User-Agent': 'blogrep-wordpress-importer/1.0 (+https://blogrep)',
  }

  if (wpUsername && wpAppPassword) {
    const auth = Buffer.from(`${wpUsername}:${wpAppPassword}`).toString('base64')
    headers.Authorization = `Basic ${auth}`
  }

  return headers
}

function decodeHtmlEntities(input) {
  return input
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
    html
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
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

async function fetchAllPosts() {
  const first = await fetch(`${endpoint}?per_page=100&page=1`, {
    headers: buildHeaders(),
  })
  if (!first.ok) {
    const body = await first.text()
    const snippet = body.slice(0, 220).replace(/\s+/g, ' ')
    const blockedByWaf = /Attention Required|cf-challenge|Just a moment|cloudflare/i.test(body)

    if (blockedByWaf) {
      throw new Error(
        `WordPress API is blocked by Cloudflare/WAF (${first.status}). Enable access to /wp-json/wp/v2/posts for this client, or use WP application-password auth via WP_USERNAME and WP_APP_PASSWORD.`,
      )
    }

    throw new Error(
      `WordPress API request failed: ${first.status} ${first.statusText}. Response starts with: ${snippet}`,
    )
  }

  const totalPagesHeader = first.headers.get('x-wp-totalpages')
  const totalPages = totalPagesHeader ? Number(totalPagesHeader) : 1
  const firstData = await first.json()
  const all = [...firstData]

  for (let page = 2; page <= totalPages; page += 1) {
    const res = await fetch(`${endpoint}?per_page=100&page=${page}`, {
      headers: buildHeaders(),
    })
    if (!res.ok) {
      throw new Error(`WordPress API page ${page} failed: ${res.status} ${res.statusText}`)
    }
    const pageData = await res.json()
    all.push(...pageData)
  }

  return all
}

function convertPost(wpPost) {
  const content = htmlToText(wpPost?.content?.rendered || '')
  const excerpt = htmlToText(wpPost?.excerpt?.rendered || '').slice(0, 240)

  return {
    title: decodeHtmlEntities(wpPost?.title?.rendered || 'Untitled'),
    slug: wpPost?.slug || `post-${wpPost?.id || Date.now()}`,
    date: wpPost?.date || new Date().toISOString(),
    excerpt,
    content,
    readTime: calculateReadTime(content),
  }
}

async function run() {
  if ((wpUsername && !wpAppPassword) || (!wpUsername && wpAppPassword)) {
    throw new Error('Set both WP_USERNAME and WP_APP_PASSWORD together, or neither.')
  }

  const posts = await fetchAllPosts()
  const publishedPosts = posts
    .filter((post) => post?.status === 'publish')
    .map(convertPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const outputPath = resolve('src/content/posts.json')
  await mkdir(resolve('src/content'), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(publishedPosts, null, 2)}\n`, 'utf8')

  console.log(`Imported ${publishedPosts.length} published posts to ${outputPath}`)
}

run().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
