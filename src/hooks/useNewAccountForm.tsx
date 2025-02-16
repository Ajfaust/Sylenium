import { Account } from '@/types.ts';
import { createAccount } from '@/utils/accounts.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { z } from 'zod';

type NewAccountSchema = {
  categoryId: number;
  name: string;
};

type NewAccountProps = {
  closeModal: () => void;
};

export function useNewAccountForm({ closeModal }: NewAccountProps) {
  const [postError, setPostError] = useState<string | null>(null);

  const { data: ledgerId } = useQuery(getActiveLedgerIdQueryOptions());

  const schema: z.ZodType<NewAccountSchema> = z
    .object({
      name: z.string().trim().min(1, 'Name cannot be empty'),
      categoryId: z.coerce.number().min(1, 'Category is required'),
    })
    .required();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      categoryId: '0',
    },
    validate: zodResolver(schema),
  });

  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (a: Partial<Account>) => createAccount(a),
    onSuccess: () => {
      void client.invalidateQueries({
        queryKey: ['accounts', '/api/ledgers'],
      });
      closeModal();
    },
    onError: (error) => setPostError(error.message),
  });

  const handleSubmit = (values: typeof form.values) => {
    const { data, error } = schema.safeParse(values);
    if (error) {
      setPostError(error.message);
      return;
    }

    const account: Partial<Account> = {
      name: data.name,
      ledgerId: ledgerId,
      faCategoryId: data.categoryId,
    };
    mutation.mutate(account);
  };

  return { form, handleSubmit, postError };
}
