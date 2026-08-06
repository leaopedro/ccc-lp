import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './routes'

// Build-time SSG + client hydration. `vite-react-ssg` prerenders each route to
// static HTML at build and hydrates the same markup in the browser.
export const createRoot = ViteReactSSG({ routes })
