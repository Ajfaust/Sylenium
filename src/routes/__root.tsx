import {
  type NavigateOptions,
  Outlet,
  type ToOptions,
  createRootRoute,
  useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useState } from 'react';
import { RouterProvider } from 'react-aria-components';
import { Sidebar } from '../components/Sidebar.tsx';

export const Route = createRootRoute({
  component: RootRoute,
});

declare module 'react-aria-components' {
  interface RouterConfig {
    href: ToOptions['to'];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

function RootRoute() {
  let router = useRouter();
  const [isOpen, setIsOpen] = useState(true); // State to track sidebar open/close

  return (
    <>
      <RouterProvider
        navigate={(to, options) => router.navigate({ to, ...options })}
        useHref={(to) => router.buildLocation({ to }).href}
      >
        <main className="h-screen flex bg-slate-800 px-3 py-4">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex-1 transition-all duration-300 bg-slate-500 px-3 h-full overflow-hidden">
            <Outlet />
          </div>
        </main>
        <TanStackRouterDevtools />
      </RouterProvider>
    </>
  );
}
