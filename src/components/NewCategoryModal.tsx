import { useNewCategoryForm } from '@/hooks/useNewCategoryForm.tsx';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { getAllCategoriesForLedgerQueryOptions } from '@/utils/transaction-categories.tsx';
import { Button, Group, Modal, Select, Switch, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { PiTag } from 'react-icons/pi';

export const NewCategoryModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { data: activeLedger } = useQuery(getActiveLedgerIdQueryOptions());
  const ledgerId = activeLedger?.id ?? -1;

  const { form, handleSubmit, postError } = useNewCategoryForm(close);

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useSuspenseQuery(
    getAllCategoriesForLedgerQueryOptions(ledgerId.toString())
  );
  if (isError) {
    console.log(error?.message);
    throw error;
  }

  if (isLoading) {
    return;
  }

  const parentCategoryValues = categories
    .filter((category) => !category.parentId)
    .map((c) => {
      return {
        value: c.id.toString(),
        label: c.name,
      };
    });

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Category">
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
            <Button onClick={close}>Cancel</Button>
            <Button type="submit" variant="outline">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      <Button onClick={open}>New Category</Button>
    </>
  );
};
