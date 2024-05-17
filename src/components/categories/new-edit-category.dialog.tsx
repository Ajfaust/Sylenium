import { DialogHeader, DialogTitle } from '../ui/dialog';
import { CategoryForm } from './category-form';

export function NewEditCategoryDialog({
  afterSave,
}: {
  afterSave: () => void;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>New Category</DialogTitle>
      </DialogHeader>
      <CategoryForm afterSave={afterSave} />
    </>
  );
}
