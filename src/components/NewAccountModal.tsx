import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Group,
  Modal,
  NativeSelect,
  NavLink,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from 'react-hook-form';
import { PiPlusCircle } from 'react-icons/pi';
import { z } from 'zod';

export const NewAccountModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Account" centered>
        <NewAccountForm close={close} />
      </Modal>
      <NavLink
        m={5}
        label={<Text>New Account</Text>}
        leftSection={<PiPlusCircle size={19} strokeWidth={1.5} />}
        onClick={open}
        className="rounded-lg opacity-40 hover:opacity-100"
      />
    </>
  );
};

interface AccountFormProps {
  close: () => void;
}

const NewAccountForm = ({ close }: AccountFormProps) => {
  const schema = z.object({
    name: z.string().min(1, 'Name cannot be empty'),
    category: z.coerce.number().min(0),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack p={5}>
        <TextInput
          {...register('name')}
          label="Account Name"
          error={errors.name != undefined}
        />
        {errors.name?.message && <Text>{errors.name.message.toString()}</Text>}

        <NativeSelect
          {...register('category')}
          error={errors.category != undefined}
          label="Account Category"
          data={[
            {
              label: 'Checking/Saving',
              value: '0',
            },
            {
              label: 'Credit Card',
              value: '1',
            },
            {
              label: 'Investment',
              value: '2',
            },
          ]}
        />
        {errors.category?.message && (
          <p>{errors.category.message.toString()}</p>
        )}
      </Stack>
      <Group justify="end" m={5}>
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
