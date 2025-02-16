import { Transaction } from '@/types.ts';
import { createTransaction } from '@/utils/transactions.tsx';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { ZodType, z } from 'zod';

type NewTransactionSchema = {
  date: Date;
  categoryId: number;
  vendorId: number;
  description: string;
  inflow: number;
  outflow: number;
  cleared: boolean;
};

export type NewTransactionProps = {
  accountId: number;
  closeModal: () => void;
};

export function useNewTransactionForm({
  accountId,
  closeModal,
}: NewTransactionProps) {
  const [postError, setPostError] = useState<string | null>(null);

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

  return { form, handleSubmit, postError };
}
