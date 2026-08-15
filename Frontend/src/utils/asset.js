// Resolves a path against Vite's configured `base` (see vite.config.js),
// so asset references work whether the site is deployed at a domain root
// (Netlify/Vercel/custom domain) or under a subpath (e.g. GitHub Pages
// project sites at username.github.io/RepoName/). Always call this instead
// of writing a literal "/..." path for anything in /public.
export function asset(path) {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanBase + cleanPath;
}
