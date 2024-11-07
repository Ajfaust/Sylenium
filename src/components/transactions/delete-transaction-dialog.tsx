import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteTransaction } from '@/hooks/transactions';

import { Button } from '../ui/button';

export function DeleteTransactionDialog({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) {
  const { mutateAsync } = useDeleteTransaction();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Delete Transaction</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Are you sure? This action is irreversible.
      </DialogDescription>
      <DialogFooter className="sm:justify-end">
        <Button
          type="button"
          variant="destructiveOutline"
          onClick={() => mutateAsync(id).then(onClose)}
        >
          Yes
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="default">
            No
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}