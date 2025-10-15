import { createFileRoute } from '@tanstack/react-router'
import { TaskPage } from '@/pages/task'

export const Route = createFileRoute('/task')({
  component: TaskPage,
})