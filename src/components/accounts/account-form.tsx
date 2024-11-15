import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FaDollarSign } from 'react-icons/fa6';
import { z } from 'zod';

import { useCreateAccount } from '@/hooks/accounts';
import { Account } from '@/types';

import { Button } from '../ui/button';
import { DialogClose, DialogFooter } from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export function AccountForm({ afterSave }: { afterSave: () => void }) {
  const { mutateAsync, isPending } = useCreateAccount();

  const formSchema = z.object({
    name: z.string().trim().min(1, 'Account name cannot be empty'),
    balance: z.coerce.number().nonnegative().int(),
  }) satisfies z.ZodType<Partial<Account>>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      balance: 0,
    },
  });

  function onSubmit(values: Partial<Account>) {
    return mutateAsync(values).then(afterSave);
  }

  return (
    <>
      <Form {...form}>
        <form
          className="mt-2 space-y-8"
          onSubmit={form.handleSubmit((values) => onSubmit(values))}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Account Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Balance</FormLabel>
                <FormControl>
                  <div className="relative flex max-w-2xl items-center">
                    <FaDollarSign className="absolute left-2 top-1/2 size-auto -translate-y-1/2" />
                    <Input
                      className="pl-7"
                      placeholder="Balance"
                      type="number"
                      min="0.00"
                      step="0.01"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              { isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
