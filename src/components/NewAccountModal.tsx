import { Account, AccountCategory } from '@/types.ts';
import { getAllAccountCategoriesForLedgerQueryOptions } from '@/utils/account-categories.tsx';
import { createAccount } from '@/utils/accounts.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  NativeSelect,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiPlusCircle } from 'react-icons/pi';
import { z } from 'zod';

interface NewAccountProps {
  ledgerId: number;
}

interface NewAccountFormProps {
  categories: Array<AccountCategory>;
  ledgerId: number;
  close: () => void;
}

type NewAccount = {
  categoryId: number;
  name: string;
};

export const NewAccountModal = ({ ledgerId }: NewAccountProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useSuspenseQuery(
    getAllAccountCategoriesForLedgerQueryOptions(ledgerId.toString())
  );

  if (isError) {
    console.log(error?.message);
    throw error;
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Account" pos="relative">
        <LoadingOverlay visible={isLoading} />
        <NewAccountForm
          ledgerId={ledgerId}
          categories={categories}
          close={close}
        />
      </Modal>
      <UnstyledButton
        ml={10}
        onClick={open}
        className="rounded-lg opacity-40 hover:opacity-100"
      >
        <Group p={5}>
          <PiPlusCircle size={20} strokeWidth={1.5} />
          <Text>New Account</Text>
        </Group>
      </UnstyledButton>
    </>
  );
};

const NewAccountForm = ({
  ledgerId,
  categories,
  close,
}: NewAccountFormProps) => {
  const [postError, setPostError] = useState<string | null>(null);

  const schema: z.ZodType<NewAccount> = z
    .object({
      name: z.string().trim().min(1, 'Name cannot be empty'),
      categoryId: z.coerce.number().min(1, 'Category is required'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAccount>({ resolver: zodResolver(schema) });

  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (a: Partial<Account>) => createAccount(a),
    onSuccess: () => {
      void client.invalidateQueries({
        queryKey: ['accounts', '/api/ledgers'],
      });
      close();
    },
    onError: (error) => setPostError(error.message),
  });

  const onSubmit = (newAcct: NewAccount) => {
    const account: Partial<Account> = {
      name: newAcct.name,
      ledgerId: ledgerId,
      faCategoryId: newAcct.categoryId,
    };
    mutation.mutate(account);
  };

  return (
    <>
      {postError && <p className="text-sm text-red-500">{postError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register('name')}
          label="Account Name"
          withAsterisk
          error={errors.name != undefined}
          pb={10}
        />
        {errors.name?.message && (
          <p className=" text-sm text-red-500">
            {errors.name.message.toString()}
          </p>
        )}

        <NativeSelect
          {...register('categoryId')}
          label="Account Category"
          error={errors.categoryId != undefined}
          withAsterisk
          data={categories?.map((c) => {
            return {
              value: c.id.toString(),
              label: c.name,
            };
          })}
          py={10}
        />
        {errors.categoryId?.message && (
          <p className="text-sm text-red-500">
            {errors.categoryId.message.toString()}
          </p>
        )}
        <Group justify="end" pt={20}>
          <Button variant="filled" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" variant="outline" loading={mutation.isPending}>
            Add
          </Button>
        </Group>
      </form>
    </>
  );
};
