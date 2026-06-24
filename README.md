# Company

Landing page for a data platform + consulting business. Static HTML/CSS with a React Flow diagram in the “How it works” section.

## Local preview

```bash
npm install   # once
npm run dev
```

Open http://localhost:5173 (Vite default). Production build preview: `npm run preview` → http://localhost:3000

## Deploy to Vercel

1. Import the project in [Vercel](https://vercel.com/new) and connect the GitHub repo.
2. Build command: `npm run build` (configured in `vercel.json`).
3. Output directory: `dist`.
4. Deploy from `main`.

After setup, run `npm install` once to enable git hooks. Each commit on `main` auto-pushes to GitHub, which triggers a Vercel deploy. Skip with `SKIP_VERCEL=1 git commit`.

## Structure

| Path | Purpose |
|------|---------|
| `index.html` | Landing page shell |
| `src/main.jsx` | Mounts React Flow into `#data-flow-root` |
| `src/flow/` | Diagram component + custom nodes |
| `styles/` | Theme tokens, layout, flow styles |
| `public/` | Static assets copied to `dist/` |
| `vite.config.js` | Vite build config |

## Customizing the flow diagram

Edit `src/flow/DataFlowDiagram.jsx` for nodes, edges, and layout. Custom node UI lives in `src/flow/nodes.jsx`. Clay-themed styles are in `styles/flow-react.css`.

The diagram is read-only (no pan/zoom) for now — good for a hero-style visual. Re-enable interaction in `DataFlowDiagram.jsx` when you want reactflow.dev-style behavior.
