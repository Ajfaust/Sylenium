import { DialogHeader, DialogTitle } from '../ui/dialog';
import { AccountForm } from './account-form';

export function NewEditAccountDialog() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>New Account</DialogTitle>
      </DialogHeader>
      <AccountForm />
    </>
  );
}
