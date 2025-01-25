import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { allAccountsForLedgerQueryOptions } from '../../utils/accounts.tsx';

export const Route = createFileRoute('/ledgers/$ledgerId/accounts')({
  loader: async ({ params: { ledgerId }, context }) => {
    const ledgerAccounts = await context.queryClient.ensureQueryData(
      allAccountsForLedgerQueryOptions(ledgerId)
    );

    return { accounts: ledgerAccounts };
  },
  component: LedgerAccountsComponent,
});

function LedgerAccountsComponent() {
  const { ledgerId } = Route.useParams();
  const { data } = useSuspenseQuery(allAccountsForLedgerQueryOptions(ledgerId));

  console.log(data);

  return (
    <>
      <h1>Accounts</h1>
      {Array.isArray(data.accounts) &&
        data.accounts.map((a) => (
          <div key={a.id}>
            <h4 key={a.name}>
              {a.name} Id: {a.id}
            </h4>
          </div>
        ))}
    </>
  );
}
