import {
  NewTransactionProps,
  useNewTransactionForm,
} from '@/hooks/useNewTransactionForm.tsx';
import { Vendor } from '@/types.ts';
import { getActiveLedgerIdQueryOptions } from '@/utils/ledgers.tsx';
import { getAllCategoriesForLedgerQueryOptions } from '@/utils/transaction-categories.tsx';
import { getAllVendorsForLedgerQueryOptions } from '@/utils/vendors.tsx';
import {
  Button,
  Checkbox,
  Group,
  Modal,
  NumberInput,
  Select,
  Textarea,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  PiCalendar,
  PiCurrencyDollar,
  PiStorefront,
  PiTag,
} from 'react-icons/pi';

dayjs.extend(utc);

type TransactionModalProps = {
  accountId: number;
};

export const NewTransactionModal = ({ accountId }: TransactionModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { data } = useQuery(getActiveLedgerIdQueryOptions());
  const ledgerId = data ?? -1;

  const {
    data: categories,
    isError: categoriesIsError,
    error: categoriesError,
  } = useSuspenseQuery(
    getAllCategoriesForLedgerQueryOptions(ledgerId.toString())
  );
  if (categoriesIsError) {
    console.log('Categories error:', categoriesError);
    throw categoriesError;
  }

  const categoriesData = categories
    .filter((c) => c.subcategories && c.subcategories.length > 0)
    .map((c) => {
      return {
        group: c.name,
        items: c.subcategories!.map((sc) => {
          return {
            value: sc.id!.toString(),
            label: sc.name!,
          };
        }),
      };
    });

  const {
    data: vendors,
    isError: vendorsIsError,
    error: vendorsError,
  } = useSuspenseQuery(getAllVendorsForLedgerQueryOptions(ledgerId.toString()));
  if (vendorsIsError) {
    console.log('Vendors error:', vendorsError);
    throw vendorsError;
  }

  const vendorData = vendors.map((v: Vendor) => {
    return {
      value: v.id.toString(),
      label: v.name,
    };
  });

  const props: NewTransactionProps = {
    accountId: accountId,
    closeModal: close,
  };
  const { form, handleSubmit, postError } = useNewTransactionForm(props);

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Transaction">
        {postError && <p className={'text-sm text-red-500'}>{postError}</p>}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <DatePickerInput
            label="Transaction Date"
            placeholder="Pick a date"
            withAsterisk
            leftSection={<PiCalendar size={18} strokeWidth={1.5} />}
            hideOutsideDates
            firstDayOfWeek={0}
            maxDate={new Date()}
            py={10}
            key={form.key('date')}
            {...form.getInputProps('date')}
          />

          <Select
            label="Category"
            placeholder="Pick a category"
            allowDeselect={false}
            withAsterisk
            data={categoriesData}
            leftSection={<PiTag size={18} strokeWidth={1.5} />}
            py={10}
            key={form.key('categoryId')}
            {...form.getInputProps('categoryId')}
          />

          <Select
            label="Vendor"
            description="Where your money came from or went to"
            placeholder="Pick a vendor"
            allowDeselect={false}
            withAsterisk
            data={vendorData}
            leftSection={<PiStorefront size={18} strokeWidth={1.5} />}
            py={10}
            key={form.key('vendorId')}
            {...form.getInputProps('vendorId')}
          />

          <Textarea
            label="Description"
            placeholder="Add notes"
            py={10}
            key={form.key('description')}
            {...form.getInputProps('description')}
          />

          <Group py={10}>
            <NumberInput
              label="Inflow"
              description="Amount received"
              placeholder="Input amount"
              leftSection={<PiCurrencyDollar size={18} strokeWidth={1.5} />}
              thousandSeparator=","
              decimalScale={2}
              hideControls
              key={form.key('inflow')}
              {...form.getInputProps('inflow')}
            />

            <NumberInput
              label="Outflow"
              description="Amount paid"
              placeholder="Input amount"
              leftSection={<PiCurrencyDollar size={18} strokeWidth={1.5} />}
              thousandSeparator=","
              decimalScale={2}
              hideControls
              key={form.key('outflow')}
              {...form.getInputProps('outflow')}
            />
          </Group>

          <Checkbox
            label="Cleared"
            py={10}
            key={form.key('cleared')}
            {...form.getInputProps('cleared')}
          />

          <Group justify="end">
            <Button onClick={close}>Cancel</Button>
            <Button type="submit" variant="outline">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      <Button onClick={open}>New Transaction</Button>
    </>
  );
};
