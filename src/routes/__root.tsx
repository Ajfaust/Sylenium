import {
  type NavigateOptions,
  Outlet,
  type ToOptions,
  createRootRoute,
  useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { RouterProvider } from 'react-aria-components';

export const Route = createRootRoute({
  component: RootRoute,
});

declare module 'react-aria-components' {
  interface RouterConfig {
    href: ToOptions['to'];
    routerOptions: Omit<NavigateOptions, keyof ToOptions['to']>;
  }
}

function RootRoute() {
  let router = useRouter();
  return (
    <RouterProvider
      navigate={(to, options) => router.navigate({ to, ...options })}
      useHref={(to) => router.buildLocation(to ?? '').href}
    >
      <Outlet />
      <TanStackRouterDevtools />
    </RouterProvider>
  );
}
