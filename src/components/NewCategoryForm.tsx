import { TransactionCategory } from '@/types.ts';
import { createCategory } from '@/utils/transaction-categories.tsx';
import { Button, Group, Select, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { PiTag } from 'react-icons/pi';
import { ZodType, z } from 'zod';

type NewCategorySchema = {
  name: string;
  isParent: boolean;
  parentId?: number;
  initialSubName?: string;
};

type NewCategoryProps = {
  ledgerId: number;
  parentCategories: TransactionCategory[];
  closeModal: () => void;
};

export const NewCategoryForm = ({
  ledgerId,
  parentCategories,
  closeModal,
}: NewCategoryProps) => {
  const [postError, setPostError] = useState<string | null>(null);

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

  const parentCategoryValues = parentCategories.map((c) => {
    return {
      value: c.id.toString(),
      label: c.name,
    };
  });

  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (c: Partial<TransactionCategory>) => createCategory(c),
    onSuccess: () => {
      void client.invalidateQueries({
        queryKey: ['categories', '/api/ledgers', ledgerId.toString()],
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

  return (
    <>
      {postError && <p className="text-sm text-red-500">{postError}</p>}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Category Name"
          placeholder="Category Name"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />

        <Switch
          labelPosition="left"
          label="Parent category?"
          my={5}
          key={form.key('isParent')}
          {...form.getInputProps('isParent')}
        />

        {form.getValues().isParent ? (
          <TextInput
            label="Initial Subcategory Name"
            description="Name of initial subcategory. Parent catgories cannot be empty."
            placeholder="Choose a subcategory name"
            mt={20}
            mb={10}
            key={form.key('initialSubName')}
            {...form.getInputProps('initialSubName')}
          />
        ) : (
          <Select
            label="Parent Category"
            placeholder="Pick a parent category"
            data={parentCategoryValues}
            mt={20}
            mb={10}
            allowDeselect={false}
            leftSection={<PiTag size={18} strokeWidth={1.5} />}
            key={form.key('parentId')}
            {...form.getInputProps('parentId')}
          />
        )}

        <Group justify="end" pt={10}>
          <Button onClick={closeModal}>Cancel</Button>
          <Button type="submit" variant="outline">
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
};
