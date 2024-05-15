'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaDollarSign, FaRegCalendar } from 'react-icons/fa6';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { cn } from '@/lib/utils';

export function NewTransactionDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-36">New Transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>
        <NewTransactionForm afterSave={() => setDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

// Save form in separate component so it can unmount after dialog is closed
function NewTransactionForm({ afterSave }: { afterSave: () => void }) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    afterSave();
  }

  dayjs.extend(localizedFormat);

  const formSchema = z.object({
    date: z.date({
      required_error: 'A transaction date is required.',
    }),
    notes: z.string(),
    inflow: z.coerce
      .number({
        required_error: 'An infow amount is required.',
      })
      .nonnegative(),
    outflow: z.coerce
      .number({
        required_error: 'An outflow amount is required.',
      })
      .nonnegative(),
    cleared: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      notes: '',
      inflow: 0,
      outflow: 0,
      cleared: false,
    },
  });

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
                      <div className="ml-4">
                        {field.value ? (
                          dayjs(field.value).format('L')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </div>
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
                      initialFocus
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
          <Button type="submit">Add</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
