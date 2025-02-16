import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_ledger/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$ledgerId/dashboard"!</div>
}
