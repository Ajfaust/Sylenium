import { getLedgersQueryOptions } from '@/utils/ledgers.tsx';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Link } from 'react-aria-components';
import { PiSignIn } from 'react-icons/pi';

export const Route = createFileRoute('/ledgers')({
  component: LedgersComponent,
});

function LedgersComponent() {
  const { data, isLoading, isError, error } = useSuspenseQuery(
    getLedgersQueryOptions()
  );

  const client = useQueryClient();
  const navigate = useNavigate();

  const updateActiveLedger = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/ledgers/active`, {
        method: 'PUT',
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((e) => console.log(e));
    },
  });

  function handleOnPress(id: number) {
    updateActiveLedger.mutate(id, {
      onSuccess: () => {
        void client.invalidateQueries({
          queryKey: ['activeLedgerId', '/api/ledgers'],
        });
        void navigate({ to: '/dashboard' });
      },
    });
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
              href={{ to: '/dashboard' }}
              onPress={() => handleOnPress(l.id)}
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
