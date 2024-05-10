import {
  Modal,
  Stack,
  TextInput,
  NativeSelect,
  Group,
  Button,
  rem,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { FaChevronDown, FaPlus } from 'react-icons/fa6';
import { z } from 'zod';

interface NewCategoryProps {
  parentCategories: string[];
}

export default function NewCategory(props: NewCategoryProps) {
  interface NewCategory {
    name: string;
    parentCategory: string | null;
  }

  const [opened, { open, close }] = useDisclosure(false);

  const categorySchema: z.ZodType<NewCategory> = z.object({
    name: z.string(),
    // Ensure parentCategory string is either null or part of the parent categories passed in
    parentCategory: z
      .string()
      .nullable()
      .refine(
        (val: string | null) =>
          val === null || props.parentCategories.includes(val)
      ),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      parentCategory: null,
    },
    validate: zodResolver(categorySchema),
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="New Category"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack bg="var(--mantine-color-body)" justify="center" gap="lg">
            <TextInput
              label="Name"
              placeholder="Category Name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <NativeSelect
              rightSection={
                <FaChevronDown style={{ width: rem(16), height: rem(16) }} />
              }
              label="Parent Category"
              data={props.parentCategories}
              mt="md"
            />
            <Group justify="flex-end">
              <Button variant="default" onClick={close}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Button onClick={open} leftSection={<FaPlus size={rem(16)} />}>
        New Category
      </Button>
    </>
  );
}
