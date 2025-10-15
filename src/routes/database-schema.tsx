import { createFileRoute } from '@tanstack/react-router'
import { DatabaseSchemaPage } from '@/pages/database-schema'

export const Route = createFileRoute('/database-schema')({
  component: DatabaseSchemaPage,
})