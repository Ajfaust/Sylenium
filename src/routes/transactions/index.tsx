import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transactions/')({
  component: () => <div>Hello /transactions/!</div>
})