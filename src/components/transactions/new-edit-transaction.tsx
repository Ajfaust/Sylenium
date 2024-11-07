import { TransactionForm } from '@/components/transactions/transaction-form';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function NewEditTransactionDialog({
  transactionId,
  accountId,
  afterSave,
}: {
  transactionId?: number;
  accountId: number;
  afterSave: () => void;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {transactionId ? 'Edit Transaction' : 'New Transaction'}
        </DialogTitle>
      </DialogHeader>
      <TransactionForm transactionId={transactionId} accountId={accountId} afterSave={afterSave} />
    </>
  );
}
