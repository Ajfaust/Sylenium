import { NewTransactionModal } from '@/components/NewTransactionModal.tsx';
import { TransactionTable } from '@/components/TransactionTable.tsx';
import { accountQueryOptions } from '@/utils/accounts.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_ledger/accounts/$accountId')({
  loader: async ({ params: { accountId }, context }) => {
    await context.queryClient.ensureQueryData(accountQueryOptions(accountId));
  },
  component: AccountComponent,
});

function AccountComponent() {
  const { accountId } = Route.useParams();

  const {
    data: account,
    isLoading,
    isError,
  } = useSuspenseQuery(accountQueryOptions(accountId));

  if (isError) throw new Error('Error loading account');

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(account);

  return (
    <>
      <NewTransactionModal accountId={parseInt(accountId)} />
      <TransactionTable data={account.transactions} />
    </>
  );
}
