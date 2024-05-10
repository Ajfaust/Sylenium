import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import {
  Modal,
  Button,
  Stack,
  rem,
  TextInput,
  NumberInput,
  Group,
  Checkbox,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { FaPlus, FaDollarSign } from 'react-icons/fa6';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface NewTransaction {
  ledgerId: number;
  date: Date;
  notes: string;
  inflow: number;
  outflow: number;
  cleared: boolean;
}

export default function NewTransactionModal() {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const dollar = <FaDollarSign style={{ width: rem(15), height: rem(15) }} />;

  const schema: z.ZodType<NewTransaction> = z.object({
    ledgerId: z.number(),
    date: z.coerce.date(),
    notes: z.string(),
    inflow: z.number().nonnegative('Amount must be a positive value'),
    outflow: z.number().nonnegative('Amount must be a positive value'),
    cleared: z.boolean(),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      ledgerId: 1,
      date: new Date(),
      notes: '',
      inflow: 0,
      outflow: 0,
      cleared: false,
    },
    validate: zodResolver(schema),
  });

  const onCreateTransaction = (
    t: NewTransaction,
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    e?.preventDefault();
    console.log('Calling mutation function...');
    mutation.mutate(t);
  };
  const mutation = useMutation({
    mutationFn: async (t: NewTransaction) => {
      console.log('Mutation function called.');
      const response = await fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(t),
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((error) => {
        throw error;
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const handleOnClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleOnClose}
        title="New Transaction"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <form onSubmit={form.onSubmit(onCreateTransaction)}>
          <Stack bg="var(--mantine-color-body)" justify="center" gap="lg">
            {mutation.error && (
              <h5 onClick={() => mutation.reset()}>{mutation.error.message}</h5>
            )}
            <DatePickerInput
              valueFormat="MM/DD/YYYY"
              label="Transaction Date"
              placeholder="Pick Date"
              maxDate={new Date()}
              key={form.key('date')}
              {...form.getInputProps('date')}
            />
            <TextInput
              label="Notes"
              placeholder="Notes about this transaction"
              key={form.key('notes')}
              {...form.getInputProps('notes')}
            />
            <Group grow my={rem(10)}>
              <NumberInput
                leftSection={dollar}
                label="Inflow"
                placeholder="Inflow"
                decimalScale={2}
                fixedDecimalScale
                defaultValue={0}
                hideControls
                key={form.key('inflow')}
                {...form.getInputProps('inflow')}
              />
              <NumberInput
                leftSection={dollar}
                label="Outflow"
                placeholder="Outflow"
                decimalScale={2}
                fixedDecimalScale
                defaultValue={0}
                hideControls
                key={form.key('outlfow')}
                {...form.getInputProps('outflow')}
              />
            </Group>
            <Checkbox
              label="Cleared"
              radius="sm"
              mt="xs"
              key={form.key('cleared')}
              {...form.getInputProps('cleared', {
                type: 'checkbox',
              })}
            />
            <Group justify="flex-end">
              <Button variant="default" onClick={handleOnClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={mutation.isPending}
              >
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Button onClick={open} leftSection={<FaPlus size={rem(16)} />}>
        New Transaction
      </Button>
    </>
  );
}
