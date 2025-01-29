import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  type NavigateOptions,
  Outlet,
  type ToOptions,
  createRootRouteWithContext,
  redirect,
  useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { RouterProvider } from 'react-aria-components';
import { Sidebar } from '../components/Sidebar.tsx';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootRoute,
  loader: () => {
    if (location.pathname === '/') {
      throw redirect({
        to: '/ledgers',
        replace: true,
      });
    }
  },
});

declare module 'react-aria-components' {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

function RootRoute() {
  let router = useRouter();

  return (
    <>
      <RouterProvider
        navigate={(path, options) => router.navigate({ ...path, ...options })}
        useHref={({ to }) => router.buildLocation({ to }).href}
      >
        <main className="h-screen flex bg-slate-800 px-3 py-4">
          <div className="top-0 h-full w-64 bg-slate-700 rounded-lg">
            <Sidebar />
          </div>
          <div className="bg-slate-500 h-full w-full overflow-hidden rounded-md">
            <Outlet />
          </div>
        </main>
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </RouterProvider>
    </>
  );
}
