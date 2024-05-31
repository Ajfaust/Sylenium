import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';
import { FaDollarSign } from 'react-icons/fa6';
import { z } from 'zod';

import { Account } from '@/types';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export function AccountForm({
  id,
  afterSave,
}: {
  id?: number;
  afterSave: () => void;
}) {
  const formSchema = z.object({
    name: z.string().trim().min(1, 'Account name cannot be empty'),
    balance: z.number().nonnegative().int(),
  }) satisfies z.ZodType<Partial<Account>>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      balance: 0,
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          className="mt-2 space-y-8"
          onSubmit={form.handleSubmit((values) => console.log(values))}
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
        </form>
      </Form>
    </>
  );
}
