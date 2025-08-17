# AirChoice Canada — Website (Jekyll)

Live site → **https://airchoice.ca**

Advocacy site for a targeted, *codeshare-only* exemption that unlocks long-haul links from Canadian secondary cities (e.g., YOW • YWG • YHZ • YEG) while keeping traffic in Canada.

---

## What’s here

- **Bilingual site (EN/FR)** with a simple language toggle
- Pages: **Homepage**, **Data & Research**, **Get Involved**, **Press Kit**, **Email Your MP**
- **Share Your Story** form (Web3Forms)
- **Email Your MP** lookup (client-side, using Represent API)
- **SEO** via `jekyll-seo-tag`, **OG images** (1200×630)
- **Structured data (JSON-LD)** for Organization + contactPoint
- **GA4 analytics** (production-only)
- **GitHub Pages** deployment (Actions)

---

## Quick start

### Prereqs
- Ruby + Bundler
- Jekyll

```bash
gem install bundler jekyll
bundle install
bundle exec jekyll serve --livereload   # http://localhost:4000
