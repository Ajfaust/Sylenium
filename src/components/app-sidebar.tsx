import { Link } from '@tanstack/react-router';
import { ChevronDown, HandCoins, Wallet } from 'lucide-react';
import React from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useGetAccounts } from '@/hooks/accounts.tsx';
import { Account } from '@/types.ts';

export function AppSidebar() {
  const [open, setOpen] = React.useState(true);
  const { data: accounts } = useGetAccounts();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>Allosta</SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible
                open={open}
                onOpenChange={setOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Wallet />
                      <span>Accounts</span>
                      <ChevronDown
                        className={`ml-auto transition-all duration-200 ${open && 'rotate-180'}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {accounts?.map((account: Account) => (
                        <SidebarMenuSubItem key={account.accountId}>
                          <SidebarMenuSubButton asChild>
                            <Link to={`/accounts/${account.accountId}`}>
                              <span>{account.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/categories">
                    <HandCoins />
                    <span>Categories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
