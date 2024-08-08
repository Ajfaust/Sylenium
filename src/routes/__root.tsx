import {
  type NavigateOptions,
  Outlet,
  RegisteredRouter,
  ToPathOption,
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
    href: ToPathOption<RegisteredRouter, '/', '/'> | ({} & string);
    routerOptions: Omit<NavigateOptions, 'to' | 'from'>;
  }
}

function RootRoute() {
  let router = useRouter();
  return (
    <RouterProvider
      navigate={(to, options) =>
        router.navigate({
          ...options,
          to: to as ToPathOption<RegisteredRouter, '/', '/'>,
        })
      }
      useHref={(to) => router.buildLocation(to).href}
    >
      <Outlet />
      <TanStackRouterDevtools />
    </RouterProvider>
  );
}
