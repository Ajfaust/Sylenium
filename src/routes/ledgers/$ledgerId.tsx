import { createFileRoute } from '@tanstack/react-router';
import { getLedgerByIdQueryOptions } from '../../utils/ledgers.tsx';

export const Route = createFileRoute('/ledgers/$ledgerId')({
  loader: async ({ params: { ledgerId }, context }) => {
    const ledger = await context.queryClient.ensureQueryData(
      getLedgerByIdQueryOptions(ledgerId)
    );

    return { ledger: ledger };
  },
  component: LedgersComponent,
});

function LedgersComponent() {
  return <h1>Hello!</h1>;
}
