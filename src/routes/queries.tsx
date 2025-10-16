import { createFileRoute } from '@tanstack/react-router'
import { QueriesPage } from '@/pages/queries'

export const Route = createFileRoute('/queries')({
  component: QueriesPage,
})