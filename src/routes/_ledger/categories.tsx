import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_ledger/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/categories"!</div>
}
