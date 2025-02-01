import { Ledger, LedgerDto } from '@/types.ts';
import {
  getActiveLedgerQueryOptions,
  getLedgersQueryOptions,
} from '@/utils/ledgers.tsx';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Link } from 'react-aria-components';
import { PiSignIn } from 'react-icons/pi';

export const Route = createFileRoute('/ledgers')({
  loader: async ({ context }) => {
    const ledgers = await context.queryClient.ensureQueryData(
      getLedgersQueryOptions()
    );

    return { ledgers: ledgers };
  },
  component: LedgersComponent,
});

function LedgersComponent() {
  const { data, isLoading, isError, error } = useSuspenseQuery(
    getLedgersQueryOptions()
  );

  const { data: active } = useQuery(getActiveLedgerQueryOptions());

  const client = useQueryClient();

  const updateLedger = useMutation({
    mutationFn: async (l: Ledger) => {
      const dto: LedgerDto = {
        name: l.name,
        isActive: l.isActive,
      };

      await fetch(`/api/ledgers/${l.id}`, {
        method: 'PUT',
        body: JSON.stringify(dto),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .catch((e) => console.log(e))
        .then(() => client.invalidateQueries({ queryKey: ['activeLedger'] }));
    },
  });

  useEffect(() => {
    if (active != null && active.id >= 0) {
      active.isActive = false;
      updateLedger.mutate(active);
      client.removeQueries({ queryKey: ['activeLedger'] }); // Remove the query to clear old values
    }
  });

  function handleOnPress(ledger: Ledger) {
    ledger.isActive = true;
    updateLedger.mutate(ledger);
  }

  if (isError) throw error;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col w-full">
      <div className="justify-center text-center w-full">
        <h1 className="text-xl text-indigo-600">Sylenium</h1>
      </div>
      <div className=" flex m-auto justify-center items-center h-screen">
        <div className="flex flex-col border-2 rounded-lg justify-center w-200">
          {data.map((l) => (
            <Link
              key={l.id}
              className="flex react-aria-Button text-lg bg-slate-200 justify-between m-2 rounded-md p-2 hover:bg-indigo-400"
              href={{
                to: '/dashboard',
              }}
              onPress={() => handleOnPress(l)}
            >
              {l.name}
              <PiSignIn size={25} strokeWidth={2} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
