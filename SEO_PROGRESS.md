# SEO TODO — Vistara Events

Last updated: 2026-05-05
Live site: https://vistaraevents.vercel.app

> All on-page / code SEO is **done**. What's left is off-site work that only you can do.
> Items below are ordered by ranking impact — start at the top.

---

## Status snapshot

| Area | State |
|---|---|
| On-page SEO (meta, schema, sitemap, robots, OG image) | ✅ Done |
| Search Console verified + sitemap submitted | ✅ Done |
| Rich Results test passed | ✅ Done |
| Google Business Profile | ❌ Not started |
| Google Reviews | ❌ Not started |
| Custom domain | ❌ Not started |
| Local citations (Justdial, etc.) | ❌ Not started |
| Blog content | ❌ Not started |

---

## 🔥 THIS WEEK — High impact, do these first

### 1. Create Google Business Profile (≈ 30 min, 1–14 days to verify)
Single biggest factor for ranking "event company near me Rewa" / "wedding planner Rewa".

- [ ] Go to https://business.google.com/create
- [ ] Business name: **Vistara Events** (exact spelling, no extra words)
- [ ] Primary category: **Wedding planner**
- [ ] Secondary categories: **Event planner**, **Wedding service**
- [ ] Address: 4th Floor, Sneh Aspire, Rewa, Madhya Pradesh 486001
- [ ] Phone: +91 91799 99927
- [ ] Website: `https://vistaraevents.vercel.app`
- [ ] Service areas: Rewa, Satna, Sidhi, Jabalpur
- [ ] Business hours: Mon–Sat 10:00–20:00 (matches the schema on the site)
- [ ] Description: copy/paste the meta description from `app/layout.tsx`
- [ ] Upload **at least 10 real photos** (mandap, sangeet, corporate galas, decoration, team)
- [ ] Add services list with price ranges (Wedding planning, Sangeet, Corporate gala, Birthday, Decoration, Catering)
- [ ] Verify by postcard or video call (Google chooses the method)

### 2. Request indexing in Search Console (≈ 2 min)
- [ ] Open https://search.google.com/search-console
- [ ] Pick property `vistaraevents.vercel.app`
- [ ] Top search bar → paste `https://vistaraevents.vercel.app/` → Enter
- [ ] Click **Request indexing** (waits ~1 min, then submits)

### 3. Buy a custom domain (≈ 15 min, ₹500–₹800/yr)
`.vercel.app` ranks weaker than a real `.com` / `.in`. Sooner you switch, sooner you start ranking.

- [ ] Check availability at https://domains.google or any registrar (GoDaddy, Namecheap, Hostinger):
  - First choice: `vistaraevents.com`
  - Backup: `vistaraevents.in`
- [ ] In Vercel: Project → Settings → Domains → Add the new domain
- [ ] Update DNS at your registrar (Vercel shows the exact records)
- [ ] **Once live, ping me back** — I will:
  - Update `SITE_URL` in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`
  - Add the new domain as a Search Console property
  - Re-submit sitemap from the new domain
  - Update GBP listing to the new domain

---

## 📈 THIS MONTH — Build authority

### 4. Get 10 Google Reviews (ongoing)
Reviews are the **#1 ranking factor** for local "near me" searches. More important than any meta tag.

- [ ] After GBP is verified, get the review link: GBP dashboard → Home → "Get more reviews" → copy URL
- [ ] WhatsApp the link to 20+ past clients with a polite ask
- [ ] Target: **10 reviews in the first month**, 25+ within 3 months, average ≥ 4.5 stars
- [ ] Reply to **every review** within 24 hours — both positive and negative

### 5. List on local directories (≈ 2 hours total)
Same exact name, address, phone everywhere — this is called **NAP consistency**. Inconsistent NAP hurts ranking.

Use this exact block when registering:
```
Vistara Events
4th Floor, Sneh Aspire, Rewa, Madhya Pradesh 486001
+91 91799 99927
https://vistaraevents.vercel.app
```

- [ ] Justdial — https://www.justdial.com (free listing + paid promo if budget allows)
- [ ] Sulekha — https://www.sulekha.com
- [ ] IndiaMART — https://www.indiamart.com (B2B but local search traffic)
- [ ] WedMeGood — https://www.wedmegood.com (most-trafficked Indian wedding directory)
- [ ] ShaadiSaga — https://www.shaadisaga.com
- [ ] WeddingWire India — https://www.weddingwire.in
- [ ] Bing Places — https://www.bingplaces.com (Bing's GBP equivalent — covers Microsoft devices)
- [ ] Apple Business Connect — https://businessconnect.apple.com (Apple Maps)
- [ ] Any local Rewa Chamber of Commerce / local business directory

### 6. Submit to Bing Webmaster Tools (≈ 5 min)
- [ ] Go to https://www.bing.com/webmasters
- [ ] Add site `https://vistaraevents.vercel.app`
- [ ] Easiest: import settings from Google Search Console (one click)
- [ ] Submit sitemap: `sitemap.xml`

---

## 📝 NEXT 2–3 MONTHS — Long-tail content

### 7. Publish 3–6 blog posts (each post = a new ranking page)
Blog posts capture long-tail searches like "cost of wedding in Rewa" that the homepage will never rank for.

Tell me when you want to start the blog and I'll set up `app/blog/[slug]/page.tsx` + an MDX pipeline. Suggested first 3 posts:

- [ ] **"Cost of a luxury wedding in Rewa, MP — full breakdown 2026"** (high search volume, ranks fast)
- [ ] **"Best wedding venues in Rewa & nearby for 2026"** (captures venue-search traffic)
- [ ] **"Top 10 sangeet themes in Madhya Pradesh"** (entertainment search traffic)

Future ideas:
- [ ] "How to plan a corporate event in Rewa: 12-step checklist"
- [ ] "Wedding decoration trends in Vindhya region 2026"
- [ ] "Hindu wedding mandap styles — a Rewa-region guide"
- [ ] "Best photographers in Rewa for weddings" (link partnership opportunity)

---

## 🔧 NICE-TO-HAVE — When you have time

### 8. Add more social platforms
For each, send me the URL and I'll add it to the JSON-LD `sameAs` array (which helps Google connect your brand to all platforms):
- [ ] Facebook page
- [ ] YouTube channel (event highlight reels rank exceptionally well)
- [ ] Pinterest profile (huge wedding-search traffic)
- [ ] WhatsApp Business catalogue (link from contact section)

### 9. Performance audit
- [ ] Run https://pagespeed.web.dev on the homepage
- [ ] Target: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] If LCP > 2.5s: ping me to migrate to Next.js `<Image>` (auto AVIF/WebP)

### 10. Replace placeholder verification token (optional safety net)
- [ ] Search Console → Settings → Ownership verification → "HTML tag" → copy the `content="..."` value
- [ ] In `app/layout.tsx`, replace `REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN` with that value
- [ ] (HTML-file verification already works — this is just a backup)

### 11. Hindi version (long-term)
- [ ] Build `app/hi/` route tree mirroring main pages, in Hindi
- [ ] Add `hreflang` alternates in metadata
- [ ] Captures Hindi-language searches in Rewa region (substantial untapped traffic)

---

## 📅 Monitoring routine

### Weekly (5 min)
- [ ] Search Console → **Performance** → check "Queries" for new keywords appearing
- [ ] Search Console → **Indexing → Pages** → make sure no pages went into "Not indexed"
- [ ] Reply to any new Google reviews

### Monthly (30 min)
- [ ] Run https://search.google.com/test/rich-results to confirm schema still parses
- [ ] Run https://pagespeed.web.dev to monitor Core Web Vitals
- [ ] Publish 1 new blog post (once blog is live)
- [ ] Update `aggregateRating` in `app/layout.tsx` to match real review count

### Quarterly (1 hour)
- [ ] Search "event company in Rewa", "wedding planner Rewa" in incognito → note top 5 competitors and what they do better
- [ ] Refresh gallery with new event photos (Google rewards fresh content)
- [ ] Audit which keywords convert vs. which just get clicks (Search Console → Performance → Pages)

---

## ✅ Already done (reference)

### On-page / Code
- `metadataBase`, canonical URL, geo meta tags
- SEO title + description + 50 long-tail keywords (Rewa / Satna / Sidhi / Jabalpur / MP)
- `robots.txt`, `sitemap.xml`
- JSON-LD: LocalBusiness + EventPlanner, Review, WebSite + SearchAction, BreadcrumbList, FAQPage, OfferCatalog
- H1 with screen-reader keyword block
- Keyword-rich `alt` attributes on every image
- LCP optimisations (`fetchPriority="high"`, preconnect, dns-prefetch)
- Auto-generated branded OG image at `/opengraph-image`
- Visible FAQ section matching the FAQPage schema
- Instagram link wired to `https://www.instagram.com/vistaraevent/`
- Production build clean (0 errors, 0 warnings)

### Search Console
- Property `vistaraevents.vercel.app` verified via HTML file (`public/google2aec643dda61fdc9.html` — **never delete**)
- Sitemap submitted and accepted
- Rich Results test passed: LocalBusiness, WebSite, BreadcrumbList, FAQPage all detected

---

## Key URLs

- Live site: https://vistaraevents.vercel.app
- Sitemap: https://vistaraevents.vercel.app/sitemap.xml
- Robots: https://vistaraevents.vercel.app/robots.txt
- OG image: https://vistaraevents.vercel.app/opengraph-image
- Search Console: https://search.google.com/search-console
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org
- PageSpeed Insights: https://pagespeed.web.dev
- Instagram: https://www.instagram.com/vistaraevent/
