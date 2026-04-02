# EmDash — A Modern Blog on Cloudflare

A clean, fast, and elegant blog template built with Next.js and deployed on Cloudflare Pages.

## Features

- ⚡ **Lightning Fast** — Static site generation with Next.js
- 🚀 **Cloudflare Pages** — Global edge network deployment
- 🎨 **Modern Design** — Clean, minimal aesthetic with Tailwind CSS
- 📱 **Responsive** — Works beautifully on all devices
- 🔍 **SEO Ready** — Built-in meta tags and Open Graph support
- 📝 **Blog Ready** — Easy-to-extend blog post structure

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The static site will be generated in the `out/` directory, ready for deployment on Cloudflare Pages.

## Deployment on Cloudflare Pages

1. **Connect your repository**
   - Push this repo to GitHub
   - Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Go to Pages → Create a project → Connect Git

2. **Configure build settings**
   - Build command: `npm run build`
   - Build output directory: `out`

3. **Deploy**
   - Cloudflare will automatically deploy on every push to main

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── page.tsx      # Home page
│   ├── blog/         # Blog posts
│   ├── layout.tsx    # Root layout
│   └── globals.css   # Global styles
├── components/       # Reusable components
├── lib/             # Utility functions
└── styles/          # CSS files
public/              # Static assets
```

## Customization

### Site Metadata

Edit `src/app/layout.tsx` to update site title, description, and Open Graph tags.

### Blog Posts

Edit the `posts` array in `src/app/page.tsx` to add new posts, or modify `src/app/blog/[slug]/page.tsx` to customize post rendering.

### Import from WordPress

This project includes a WordPress importer that pulls published posts from the WP REST API and writes them to `src/content/posts.json`.

Run:

```bash
npm run import:wp -- https://your-wordpress-site.com
```

After import, rebuild and redeploy:

```bash
npm run build
```

### Styling

Tailwind CSS is pre-configured. Edit `tailwind.config.ts` to customize colors, fonts, and other design options.

## Environment Variables

See `.env.example` for available configuration options.

## License

MIT

---

Built with ❤️ for the modern web.