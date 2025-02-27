import { TransactionCategory } from '@/types.ts';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { createCategory } from '@/utils/transaction-categories.tsx';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { ZodType, z } from 'zod';

type NewCategorySchema = {
  name: string;
  isParent: boolean;
  parentId?: number;
  initialSubName?: string;
};

export function useNewCategoryForm(closeModal: () => void) {
  const [postError, setPostError] = useState<string | null>(null);

  const { data: activeLedger } = useQuery(getActiveLedgerIdQueryOptions());
  const ledgerId = activeLedger?.id ?? -1;

  const schema: ZodType<NewCategorySchema> = z.discriminatedUnion('isParent', [
    z
      .object({
        name: z.string().max(200, 'Name must be shorter than 200 characters'),
        isParent: z.literal(false),
        parentId: z.coerce.number().min(1, 'Invalid category'),
      })
      .required(),
    z
      .object({
        name: z.string().max(200, 'Name must be shorter than 200 characters'),
        isParent: z.literal(true),
        initialSubName: z
          .string()
          .max(200, 'Name must be shorter than 200 characters'),
      })
      .required(),
  ]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      isParent: false,
      parentId: 0,
      initialSubName: '',
    },
    validate: zodResolver(schema),
  });

  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (c: Partial<TransactionCategory>) => createCategory(c),
    onSuccess: () => {
      void client.invalidateQueries({
        queryKey: ['categories', '/api/ledgers', ledgerId.toString()],
      });
      if (closeModal) closeModal();
      setPostError(null);
    },
    onError: (error) => setPostError(error.message),
  });

  const handleSubmit = (values: typeof form.values) => {
    const { data, error } = schema.safeParse(values);
    if (error) {
      setPostError(error.message);
      return;
    }

    const category: Partial<TransactionCategory> = {
      name: data?.name,
      ledgerId: ledgerId,
      parentId: data?.isParent ? undefined : data?.parentId,
      subcategories: data?.isParent
        ? [{ name: data.initialSubName, ledgerId: ledgerId }]
        : undefined,
    };

    mutation.mutate(category);
  };

  return { form, handleSubmit, postError };
}
