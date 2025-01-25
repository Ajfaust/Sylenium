import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from 'react-aria-components'
import { PiSignIn } from 'react-icons/pi'
import { getLedgersQueryOptions } from '../../utils/ledgers.tsx'

export const Route = createFileRoute('/ledgers/')({
  loader: async ({ context }) => {
    const ledgers = await context.queryClient.ensureQueryData(
      getLedgersQueryOptions(),
    )

    return { ledgers: ledgers }
  },
  component: LedgersComponent,
})

function LedgersComponent() {
  const { data } = useSuspenseQuery(getLedgersQueryOptions())

  return (
    <div className="flex flex-col">
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
                to: '/ledgers/$ledgerId/accounts',
                params: { ledgerId: l.id.toString() },
              }}
            >
              {l.name}
              <PiSignIn size={25} strokeWidth={2} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
