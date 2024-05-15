import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function DeleteTransactionAlert({ id }: { id: number }) {
  const [open, setOpen] = useState<boolean>(false);
  const mutation = useMutation({
    mutationKey: ['deleteTransaction'],
    mutationFn: deleteTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setOpen(false);
    },
  });
  const queryClient = useQueryClient();

  async function deleteTransaction(id: number) {
    const result = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this transaction?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
