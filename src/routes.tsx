import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import V1App from './v1/App'
import ConvitePage from './components/ConvitePage'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.tsx',
  },
  {
    path: 'convite',
    element: <ConvitePage />,
    entry: 'src/components/ConvitePage.tsx',
  },
  // Archived v1 landing page, frozen. Kept available at /v1.
  {
    path: 'v1',
    element: <V1App />,
    entry: 'src/v1/App.tsx',
  },
]
