import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useState } from 'react';
import { FaEllipsis } from 'react-icons/fa6';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DeleteTransactionDialog } from './delete-transaction-dialog';
import { NewEditTransactionDialog } from './new-edit-transaction';

enum Dialogs {
  Edit = 'editDialog',
  Delete = 'deleteDialog',
}

export function TransactionDropdownMenu({
  transactionId,
  accountId,
}: {
  transactionId: number;
  accountId: number;
}) {
  const [dialog, setDialog] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden.Root>
        <DialogDescription>Description</DialogDescription>
      </VisuallyHidden.Root>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <FaEllipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild onClick={() => setDialog(Dialogs.Edit)}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild onClick={() => setDialog(Dialogs.Delete)}>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-md">
        {dialog === Dialogs.Delete && (
          <DeleteTransactionDialog
            id={transactionId}
            onClose={() => setOpen(false)}
          />
        )}
        {dialog === Dialogs.Edit && (
          <NewEditTransactionDialog
            transactionId={transactionId}
            accountId={accountId}
            afterSave={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
