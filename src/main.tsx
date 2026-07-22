import { ViteReactSSG } from 'vite-react-ssg/single-page'
import { StrictMode } from 'react'
import './index.css'
import App from './App'

// Build-time SSG + client hydration. `vite-react-ssg` renders <App /> to static
// HTML at build and hydrates the same markup in the browser.
export const createRoot = ViteReactSSG(
  <StrictMode>
    <App />
  </StrictMode>,
)
