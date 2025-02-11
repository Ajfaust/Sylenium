import { useNewCategoryForm } from '@/hooks/useNewCategoryForm.tsx';
import { TransactionCategory } from '@/types.ts';
import { Button, Group, Select, Switch, TextInput } from '@mantine/core';
import { PiTag } from 'react-icons/pi';

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
  const { form, handleSubmit, postError } = useNewCategoryForm({
    ledgerId,
    closeModal,
  });

  const parentCategoryValues = parentCategories.map((c) => {
    return {
      value: c.id.toString(),
      label: c.name,
    };
  });

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
