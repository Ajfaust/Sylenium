import { TransactionForm } from '@/components/transactions/transaction-form';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function NewEditTransactionDialog({
  type,
  id,
  afterSave,
}: {
  type: string;
  id?: number;
  afterSave: () => void;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {type === 'new' ? 'New Transaction' : 'Edit Transaction'}
        </DialogTitle>
      </DialogHeader>
      <TransactionForm id={id} afterSave={afterSave} />
    </>
  );
}
