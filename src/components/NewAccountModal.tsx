import { AccountCategory } from '@/types.ts';
import { getAllAccountCategoriesForLedgerQueryOptions } from '@/utils/account-categories.tsx';
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
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { PiPlusCircle } from 'react-icons/pi';
import { z } from 'zod';

interface NewAccountProps {
  ledgerId: string;
}

interface NewAccountFormProps {
  categories: Array<AccountCategory>;
  close: () => void;
}

type NewAccount = {
  categoryId: string;
  name: string;
};

export const NewAccountModal = ({ ledgerId }: NewAccountProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useSuspenseQuery(getAllAccountCategoriesForLedgerQueryOptions(ledgerId));

  if (isError) {
    console.log(error?.message);
    throw error;
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Account" pos="relative">
        <LoadingOverlay visible={isLoading} />
        <NewAccountForm categories={categories} close={close} />
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

const NewAccountForm = ({ categories, close }: NewAccountFormProps) => {
  const schema: z.ZodType<NewAccount> = z
    .object({
      categoryId: z
        .string()
        .min(1, 'Category is required')
        .regex(new RegExp('[0-9]+')),
      name: z.string().trim().min(1, 'Name cannot be empty'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
    if (close) close();
  };

  return (
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
        <Button type="submit" variant="outline">
          Add
        </Button>
      </Group>
    </form>
  );
};
