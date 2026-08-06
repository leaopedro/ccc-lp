import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
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
]
