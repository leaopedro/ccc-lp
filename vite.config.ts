import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `vite-react-ssg` reads `ssgOptions` from the Vite config, but Vite's own type
// doesn't know about it — so we extend UserConfig locally.
const config: UserConfig & { ssgOptions?: { dirStyle?: 'flat' | 'nested' } } = {
  plugins: [react(), tailwindcss()],
  // Emit routes as `route/index.html` so Vercel serves clean URLs like
  // `/convite` — matching the working `/privacy` static page.
  ssgOptions: {
    dirStyle: 'nested',
  },
}

export default defineConfig(config)
