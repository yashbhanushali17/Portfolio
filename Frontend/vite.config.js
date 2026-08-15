import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // If deploying to a subpath (e.g. GitHub Pages project site at
  // https://username.github.io/RepoName/), set this to '/RepoName/'.
  // If deploying at a domain root (Netlify, Vercel, Render, a custom
  // domain, or GitHub Pages as a user/org site), leave it as '/'.
  // Every asset reference in this project (JS/CSS bundle, audio, optional
  // background photos) respects this single setting — see src/utils/asset.js.
  base: '/',
})
