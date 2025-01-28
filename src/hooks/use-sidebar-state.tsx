import { QueryClient, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function useSidebarState(client: QueryClient) {
  const [visible, setVisible] = useState(false);
  const { data: sidebarVisible } = useQuery({
    queryKey: ['sidebarState'],
    queryFn: () => visible,
    staleTime: Infinity,
  });

  const setSidebarState = (state: boolean) => {
    if (visible == state) return;

    client.setQueryData(['sidebarState'], () => state);
    setVisible(state);
  };

  return { sidebarVisible, setSidebarState };
}
