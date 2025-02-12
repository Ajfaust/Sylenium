import { useNewAccountForm } from '@/hooks/useNewAccountForm.tsx';
import { getAllAccountCategoriesForLedgerQueryOptions } from '@/utils/account-categories.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
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
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { PiPlusCircle } from 'react-icons/pi';

export const NewAccountModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const {
    data: ledgerId,
    isError: isLedgerIdError,
    error: ledgerIdError,
  } = useQuery(getActiveLedgerIdQueryOptions());
  if (isLedgerIdError) {
    console.log(ledgerIdError);
    throw ledgerIdError;
  }

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useSuspenseQuery(
    getAllAccountCategoriesForLedgerQueryOptions(ledgerId!.toString())
  );

  if (isError) {
    console.log(error?.message);
    throw error;
  }

  const { form, handleSubmit, postError } = useNewAccountForm({
    closeModal: close,
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Account" pos="relative">
        <LoadingOverlay visible={isLoading} />
        {postError && <p className="text-sm text-red-500">{postError}</p>}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Account Name"
            withAsterisk
            pb={10}
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <NativeSelect
            label="Account Category"
            withAsterisk
            data={categories?.map((c) => {
              return {
                value: c.id.toString(),
                label: c.name,
              };
            })}
            py={10}
            key={form.key('categoryId')}
          />

          <Group justify="end" pt={20}>
            <Button variant="filled" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" variant="outline">
              Add
            </Button>
          </Group>
        </form>
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
