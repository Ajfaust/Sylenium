import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteCategory } from '@/hooks/categories';

import { Button } from '../ui/button';

export function DeleteCategoryDialog({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) {
  const { mutateAsync } = useDeleteCategory();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Delete Category</DialogTitle>
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
