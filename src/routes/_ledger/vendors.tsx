import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_ledger/vendors')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/vendors"!</div>
}
