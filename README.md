# dydipanshu.online

Personal site. Astro, plain CSS, no UI framework.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
```

## Where things live

| What | File |
| --- | --- |
| Name, email, links, work history, skills | `src/data/site.ts` |
| Projects (Work page + write-ups) | `src/content/projects/*.md` (`featured: true` puts it on the home page) |
| Lab entries | `src/content/lab/*.md` |
| Blog posts | `src/content/blog/*.mdx` (`draft: true` hides a post) |
| Home page text | `src/pages/index.astro` |
| About page text | `src/pages/about.astro` |
| Colours, type, spacing | `src/styles/global.css` |

Share images (`/og/*.png`), the sitemap and robots.txt are generated at build time.

## Visitor stats

The site counts visits with [GoatCounter](https://www.goatcounter.com): free, no cookies, no consent banner needed.

1. Sign up at goatcounter.com and pick **dydipanshu** as your code, so your dashboard is `dydipanshu.goatcounter.com`.
   If that name is taken, pick another and change `goatcounter` in `src/data/site.ts`.
2. That's it. Once the site is live you'll see visits, pages, where people came from (LinkedIn, Google, …), country and device.
   Clicks on each option in the Contact menu (Gmail, Outlook, Mail app, Copy) show up as their own entries.

Local testing (`localhost`) isn't counted.

## Deploy (free) to GitHub Pages on dydipanshu.online

1. Push this folder to a GitHub repo, on the `main` branch.
2. In the repo, go to **Settings → Pages → Source** and pick **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push.
3. Under **Settings → Pages → Custom domain**, enter `dydipanshu.online` and tick **Enforce HTTPS** once it's available. (`public/CNAME` already has the domain.)
4. At your domain registrar, add DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `<your-github-username>.github.io`

Vercel or Cloudflare Pages work too: import the repo, and they detect Astro with no extra settings.
