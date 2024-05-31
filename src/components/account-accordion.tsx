import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'lucide-react';
import { useState } from 'react';
import { FaBuildingColumns, FaPlus } from 'react-icons/fa6';

import { cn } from '@/lib/utils';
import { allAccountsQueryOptions } from '@/utils/accounts-helper';

import { NewEditAccountDialog } from './accounts/new-edit-account-dialog';
import { SidebarButton } from './sidebar-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button, buttonVariants } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

export function AccountAccordion() {
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
