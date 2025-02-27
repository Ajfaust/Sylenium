import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaDollarSign, FaRegCalendar } from 'react-icons/fa6';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  useCreateTransaction,
  useGetTransaction,
  useUpdateTransaction,
} from '@/hooks/transactions';
import { cn } from '@/lib/utils';
import { formSchema } from '@/schema';
import { Transaction } from '@/types';

export function TransactionForm({
  transactionId,
  accountId,
  afterSave,
}: {
  transactionId?: number;
  accountId: number;
  afterSave: () => void;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { mutateAsync: createAsync, isPending: createPending } =
    useCreateTransaction();
  const { mutateAsync: updateAsync, isPending: updatePending } =
    useUpdateTransaction();

  dayjs.extend(localizedFormat);

  const { data } = useGetTransaction(transactionId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionId: 0,
      categoryId: 0,
      accountId: accountId,
      date: new Date(),
      notes: '',
      inflow: 0,
      outflow: 0,
      cleared: false,
    },
    values: data,
  });

  const onSubmit = (values: Transaction) => {
    if (transactionId) {
      return updateAsync(values).then(afterSave);
    }
    return createAsync(values).then(afterSave);
  };

  return (
    <Form {...form}>
      <form className="mt-2 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Transaction Date</FormLabel>
              <FormControl>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] justify-start pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <FaRegCalendar className="size-4 opacity-50" />
                      <div className="ml-4">{format(field.value, 'P')}</div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setCalendarOpen(false);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input placeholder="Transaction Notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full flex-row justify-between">
          <div className="mr-2 w-auto justify-self-start">
            <FormField
              control={form.control}
              name="inflow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inflow</FormLabel>
                  <FormControl>
                    <div className="relative flex max-w-2xl items-center">
                      <FaDollarSign className="absolute left-2 top-1/2 size-auto -translate-y-1/2" />
                      <Input
                        className="pl-7"
                        placeholder="Inflow"
                        type="number"
                        min="0.00"
                        max="500000"
                        step="0.01"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="ml-2 w-auto justify-self-end">
            <FormField
              control={form.control}
              name="outflow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outflow</FormLabel>
                  <FormControl>
                    <div className="relative flex max-w-2xl items-center">
                      <FaDollarSign className="absolute left-2 top-1/2 size-auto -translate-y-1/2" />
                      <Input
                        className="pl-7"
                        placeholder="Outflow"
                        type="number"
                        min="0.00"
                        max="500000"
                        step="0.01"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="cleared"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center">
              <FormLabel className="mr-2 pt-1">Cleared:</FormLabel>
              <FormControl>
                <Checkbox
                  className="size-5"
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" disabled={createPending || updatePending}>
            {createPending || updatePending ? (
              <Loader2 className="animate-spin" />
            ) : transactionId ? (
              'Update'
            ) : (
              'Add'
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
