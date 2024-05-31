import { DialogTitle } from '@radix-ui/react-dialog';

import { DialogHeader } from '../ui/dialog';

export function NewEditAccountDialog({ afterSave }: { afterSave: () => void }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>New Account</DialogTitle>
      </DialogHeader>
      <NewEditAccountDialog afterSave={afterSave} />
    </>
  );
}
