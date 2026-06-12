# Y/B — We build the web. We secure it.

Personal brand / studio site for **Youssef Baaziz**. Black, white, one neon-lime dot.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Supabase

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

The site works out of the box — without Supabase configured, contact-form
submissions are accepted but not stored (a warning is logged server-side).

## Wire up Supabase (contact form)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql` (creates `contact_messages`, RLS locked — only the service role can touch it).
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` — Project Settings → API → Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — Project Settings → API → service_role key (**server-only secret**)
4. Restart the dev server. Submissions now land in the `contact_messages` table.

## Deploy (Vercel)

```bash
npx vercel
```

or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
Add the two env vars in Vercel → Project → Settings → Environment Variables.

Before launch: set your real domain in `src/data/site.ts` (`site.url`) — it drives
the Open Graph / metadata URLs.

## Edit content without touching components

| File                   | Controls                                              |
| ---------------------- | ----------------------------------------------------- |
| `src/data/site.ts`     | Name, email, socials, nav, stats, skills, marquee     |
| `src/data/services.ts` | The four service cards                                |
| `src/data/projects.ts` | Project grid + full case-study pages (`/work/[slug]`) |

Add a project = add one object to `projects.ts`. The grid card, the case-study
page, and next/prev navigation all derive from it.

## Map

```
src/
  app/
    page.tsx              # home: hero → marquee → services → work → about → contact
    work/[slug]/page.tsx  # case-study template (static-generated per project)
    api/contact/route.ts  # validates + stores submissions in Supabase
    not-found.tsx         # on-brand 404
    layout.tsx            # fonts, metadata/OG, global chrome
    icon.svg              # B-dot favicon
  components/             # Hero, HeroCanvas, Work, Contact, Terminal, …
  data/                   # all editable content lives here
  lib/supabase.ts         # server-only Supabase client (null-safe when unconfigured)
supabase/schema.sql       # run once in your Supabase project
```

## Easter eggs

- Press `/` anywhere → the audit terminal.
- Open the browser console → say hi.

Built & secured by Y/B.
