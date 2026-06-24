# Company

Minimal static site starter. Placeholder page until the company has a name.

## Local preview

```bash
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Import the project in [Vercel](https://vercel.com/new) and connect the GitHub repo.
2. No build command needed — static files deploy as-is.
3. Deploy from `main`.

After setup, run `npm install` once to enable git hooks. Each commit on `main` auto-pushes to GitHub, which triggers a Vercel deploy. Skip with `SKIP_VERCEL=1 git commit`.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Placeholder landing page |
| `styles/tokens.css` | Design tokens (colors, motion) |
| `favicon.svg` | Placeholder favicon |
| `vercel.json` | Vercel static deploy config |
