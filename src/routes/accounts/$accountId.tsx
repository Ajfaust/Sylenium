import { createFileRoute } from '@tanstack/react-router';
import { accountQueryOptions } from '../../utils/accounts.tsx';

export const Route = createFileRoute('/accounts/$accountId')({
  loader: async ({ params: { accountId }, context }) => {
    const account = await context.queryClient.ensureQueryData(
      accountQueryOptions(accountId)
    );

    return { account };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/accounts/$accountId"!</div>;
}
