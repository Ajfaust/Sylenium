import { TransactionTable } from '@/components/TransactionTable.tsx'
import { accountQueryOptions } from '@/utils/accounts.tsx'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_ledger/accounts/$accountId')({
  loader: async ({ params: { accountId }, context }) => {
    await context.queryClient.ensureQueryData(accountQueryOptions(accountId))
  },
  component: AccountComponent,
})

function AccountComponent() {
  const act = Route.useParams()
  const {
    data: account,
    isLoading,
    isError,
  } = useSuspenseQuery(accountQueryOptions(act.accountId))

  if (isError) throw new Error('Error loading account')

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  console.log(account)

  return <TransactionTable data={account.transactions} />
}
