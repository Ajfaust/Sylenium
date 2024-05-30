import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/transactions/columns';
import { useGetTransactionsByAccount } from '@/hooks/transactions';
import { Account } from '@/types';
import { accountQueryOptions } from '@/utils/accounts-helper';

export const Route = createFileRoute('/accounts/$accountId')({
  loader: ({ context: { queryClient }, params: { accountId } }) =>
    queryClient.ensureQueryData(accountQueryOptions(accountId as string)),
  component: AccountSummary,
});

function AccountSummary() {
  const { accountId } = Route.useParams();
  const { data: account } = useSuspenseQuery<Account>(
    accountQueryOptions(accountId as string)
  );
  const { data: transactions } = useGetTransactionsByAccount(
    accountId as string
  );

  return (
    <div className="container">
      <div className="flex w-full flex-row">
        <h2 className="grow text-3xl">{account.name} Transactions</h2>
      </div>
      <div className="mx-auto py-5">
        <DataTable columns={columns} data={transactions ?? []} />
      </div>
    </div>
  );
}
