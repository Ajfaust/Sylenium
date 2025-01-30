import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { TransactionTable } from '../../components/TransactionTable.tsx';
import { accountQueryOptions } from '../../utils/accounts.tsx';

export const Route = createFileRoute('/accounts/$accountId')({
  loader: async ({ params: { accountId }, context }) => {
    await context.queryClient.ensureQueryData(accountQueryOptions(accountId));
  },
  component: AccountComponent,
});

function AccountComponent() {
  const act = Route.useParams();
  const {
    data: account,
    isLoading,
    isError,
  } = useSuspenseQuery(accountQueryOptions(act.accountId));

  if (isError) throw new Error('Error loading account');

  console.log(account);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <TransactionTable data={account.transactions} />
      )}
    </>
  );
}
