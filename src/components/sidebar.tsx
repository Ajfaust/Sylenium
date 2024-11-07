import { AccordionContent } from '@radix-ui/react-accordion';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { FaBuildingColumns, FaPlus } from 'react-icons/fa6';

import { cn } from '@/lib/utils';
import { SidebarItem } from '@/types';
import { allAccountsQueryOptions } from '@/utils/accounts-helper';

import { NewEditAccountDialog } from './accounts/new-edit-account-dialog';
import { SidebarButton } from './sidebar-button';
import { Accordion, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button, buttonVariants } from './ui/button';
import { DialogContent } from './ui/dialog';

interface SidebarProps {
  sidebarItems: Array<SidebarItem>;
}

export function Sidebar(props: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
      <div className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">Allosta</h3>
        <div className="mt-5">
          <div className="flex w-full flex-col gap-1">
            <AccountAccordion />
            {props.sidebarItems.map((item, index) => (
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

function AccountAccordion() {
  const { data: accounts } = useSuspenseQuery(allAccountsQueryOptions);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="accounts" className="my-auto border-none">
        <AccordionTrigger
          className={cn(
            buttonVariants({
              variant: 'ghost',
            })
          )}
        >
          <div className="flex w-full flex-row justify-start gap-2 align-middle">
            <FaBuildingColumns size={18} className="my-auto" />
            <span className="hover: text-lg no-underline">Accounts</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="ml-6">
          {accounts.map((account, index) => (
            <Link key={index} to={`/accounts/${account.accountId}`}>
              <SidebarButton className="italic">{account.name}</SidebarButton>
            </Link>
          ))}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-none"
              >
                <FaPlus size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Add Account</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <NewEditAccountDialog afterSave={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}