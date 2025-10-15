import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from './lib/theme-provider'
import './index.css'
import './App.css'
import { routeTree } from './routeTree.gen'


const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="testdb-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  )
}
