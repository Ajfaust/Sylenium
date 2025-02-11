import { Transaction, Vendor } from '@/types.ts';
import { getAllCategoriesForLedgerQueryOptions } from '@/utils/transaction-categories.tsx';
import { createTransaction } from '@/utils/transactions.tsx';
import { getAllVendorsForLedgerQueryOptions } from '@/utils/vendors.tsx';
import {
  Button,
  Checkbox,
  Group,
  NumberInput,
  Select,
  Textarea,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import {
  PiCalendar,
  PiCurrencyDollar,
  PiStorefront,
  PiTag,
} from 'react-icons/pi';
import { ZodType, z } from 'zod';

dayjs.extend(utc);

type NewTransactionProps = {
  ledgerId: number;
  accountId: number;
  closeModal: () => void;
};

type NewTransactionSchema = {
  date: Date;
  categoryId: number;
  vendorId: number;
  description: string;
  inflow: number;
  outflow: number;
  cleared: boolean;
};

export const NewTransactionForm = ({
  ledgerId,
  accountId,
  closeModal,
}: NewTransactionProps) => {
  const [postError, setPostError] = useState<string | null>(null);

  const {
    data: categories,
    isError: categoriesIsError,
    error: categoriesError,
  } = useSuspenseQuery(
    getAllCategoriesForLedgerQueryOptions(ledgerId.toString())
  );
  if (categoriesIsError) {
    console.log('Categories error:', categoriesError);
    throw categoriesError;
  }

  const categoriesData = categories
    .filter((c) => c.subcategories && c.subcategories.length > 0)
    .map((c) => {
      return {
        group: c.name,
        items: c.subcategories!.map((sc) => {
          return {
            value: sc.id.toString(),
            label: sc.name,
          };
        }),
      };
    });

  const {
    data: vendors,
    isError: vendorsIsError,
    error: vendorsError,
  } = useSuspenseQuery(getAllVendorsForLedgerQueryOptions(ledgerId.toString()));
  if (vendorsIsError) {
    console.log('Vendors error:', vendorsError);
    throw vendorsError;
  }

  const vendorData = vendors.map((v: Vendor) => {
    return {
      value: v.id.toString(),
      label: v.name,
    };
  });

  const schema: ZodType<NewTransactionSchema> = z
    .object({
      date: z.coerce.date().transform((d) => dayjs.utc(d).toDate()),
      categoryId: z.coerce.number({
        invalid_type_error: 'Category is required',
      }),
      vendorId: z.coerce.number({
        invalid_type_error: 'Vendor is required',
      }),
      description: z.string().trim(),
      inflow: z.coerce.number().nonnegative('Inflow must be a positive number'),
      outflow: z.coerce
        .number()
        .nonnegative('Outflow must be a positive number'),
      cleared: z.boolean(),
    })
    .required({
      date: true,
      categoryId: true,
      vendorId: true,
      inflow: true,
      outflow: true,
    });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      date: new Date(),
      categoryId: '',
      vendorId: '',
      description: '',
      inflow: 0,
      outflow: 0,
      cleared: false,
    },
    validate: zodResolver(schema),
  });

  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (t: Partial<Transaction>) => createTransaction(t),
    onSuccess: () => {
      void client.invalidateQueries({
        queryKey: ['account', '/api/financial-accounts', accountId.toString()],
      });
      closeModal();
    },
    onError: (error) => setPostError(error.message),
  });

  const handleSubmit = (values: typeof form.values) => {
    const { data, error } = schema.safeParse(values);
    if (error) {
      setPostError(error?.message);
      return;
    }

    const transaction: Partial<Transaction> = {
      accountId: accountId,
      date: data?.date,
      categoryId: data?.categoryId,
      vendorId: data?.vendorId,
      description: data?.description,
      inflow: data?.inflow,
      outflow: data?.outflow,
      cleared: data?.cleared,
    };
    mutation.mutate(transaction);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {postError && <p className={'text-sm text-red-500'}>{postError}</p>}
      <DatePickerInput
        label="Transaction Date"
        placeholder="Pick a date"
        withAsterisk
        leftSection={<PiCalendar size={18} strokeWidth={1.5} />}
        hideOutsideDates
        firstDayOfWeek={0}
        maxDate={new Date()}
        py={10}
        key={form.key('date')}
        {...form.getInputProps('date')}
      />

      <Select
        label="Category"
        placeholder="Pick a category"
        allowDeselect={false}
        withAsterisk
        data={categoriesData}
        leftSection={<PiTag size={18} strokeWidth={1.5} />}
        py={10}
        key={form.key('categoryId')}
        {...form.getInputProps('categoryId')}
      />

      <Select
        label="Vendor"
        description="Where your money came from or went to"
        placeholder="Pick a vendor"
        allowDeselect={false}
        withAsterisk
        data={vendorData}
        leftSection={<PiStorefront size={18} strokeWidth={1.5} />}
        py={10}
        key={form.key('vendorId')}
        {...form.getInputProps('vendorId')}
      />

      <Textarea
        label="Description"
        placeholder="Add notes"
        py={10}
        key={form.key('description')}
        {...form.getInputProps('description')}
      />

      <Group py={10}>
        <NumberInput
          label="Inflow"
          description="Amount received"
          placeholder="Input amount"
          leftSection={<PiCurrencyDollar size={18} strokeWidth={1.5} />}
          thousandSeparator=","
          decimalScale={2}
          hideControls
          key={form.key('inflow')}
          {...form.getInputProps('inflow')}
        />

        <NumberInput
          label="Outflow"
          description="Amount paid"
          placeholder="Input amount"
          leftSection={<PiCurrencyDollar size={18} strokeWidth={1.5} />}
          thousandSeparator=","
          decimalScale={2}
          hideControls
          key={form.key('outflow')}
          {...form.getInputProps('outflow')}
        />
      </Group>

      <Checkbox
        label="Cleared"
        py={10}
        key={form.key('cleared')}
        {...form.getInputProps('cleared')}
      />

      <Group justify="end">
        <Button onClick={closeModal}>Cancel</Button>
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </Group>
    </form>
  );
};
