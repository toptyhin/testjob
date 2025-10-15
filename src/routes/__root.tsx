import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const RootLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <Outlet />
    <Footer />
  </div>
)

export const Route = createRootRoute({ component: RootLayout })