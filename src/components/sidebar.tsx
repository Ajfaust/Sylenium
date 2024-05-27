import { Link } from '@tanstack/react-router';

import { SidebarItems } from '@/types';

import { SidebarButton } from './sidebar-button';

interface SidebarProps {
  sidebarItems: SidebarItems;
}

export function Sidebar(props: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
      <div className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">Allosta</h3>
        <div className="mt-5">
          <div className="flex w-full flex-col gap-1">
            {props.sidebarItems.items.map((item, index) => (
              <Link key={index} to={item.href}>
                <SidebarButton icon={item.icon}>{item.label}</SidebarButton>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
