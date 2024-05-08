import { useState } from 'react';
import {
  ScrollArea,
  Table,
  Group,
  UnstyledButton,
  Text,
  Center,
  Checkbox,
  rem,
  Title,
  NumberFormatter,
  Flex,
  Loader,
} from '@mantine/core';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';
import classes from './transactionTable.module.css';
import cx from 'clsx';
import NewTransactionModal from './newTransaction';
import { useQuery } from '@tanstack/react-query';

interface Transaction {
  transactionId: number;
  date: Date;
  notes: string;
  inflow: number;
  outflow: number;
  cleared: boolean;
}

interface SortThProps {
  children: React.ReactNode;
  reversed: boolean;
  onSort(): void;
}

interface CurrencyProps {
  value: number;
}

function SortTh({ children, reversed, onSort }: SortThProps) {
  const Icon = reversed ? FaChevronUp : FaChevronDown;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={500}>{children}</Text>
          <Center className={classes.icon}>
            <Icon
              style={{ width: rem(16), height: rem(16) }}
              strokeWidth={1.5}
            />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function Currency({ value }: CurrencyProps) {
  return (
    <Flex justify="flex-end" align="flex-start" direction="row">
      <NumberFormatter
        value={value}
        fixedDecimalScale
        decimalScale={2}
        prefix="$"
        allowNegative={false}
      />
    </Flex>
  );
}

function sortData(data: Transaction[], reversed: boolean = false) {
  return [...data].sort((a, b) => {
    // Sort by date
    let result: number = a.date.getTime() - b.date.getTime();

    // Then sort by id
    if (result === 0) {
      result = a.transactionId - b.transactionId;
    }

    return reversed ? result * -1 : result;
  });
}

export function TransactionTable() {
  const [sortReversed, setSortReversed] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => {
      return fetch('/api/transactions')
        .then((res) => res.json())
        .catch((error) => console.log(error));
    },
  });

  if (isLoading || isFetching) {
    return <Loader color="grape" />;
  }

  if (error) {
    return <span>Something went wrong...</span>;
  }

  const sort = () => {
    setSortReversed(!sortReversed);
    sortData(data, sortReversed);
  };

  const rows = data?.map((row: Transaction) => (
    <Table.Tr key={row.transactionId}>
      <Table.Td>{new Date(row.date).toLocaleDateString()}</Table.Td>
      <Table.Td>{row.notes}</Table.Td>
      <Table.Td>
        <Currency value={row.inflow} />
      </Table.Td>
      <Table.Td>
        <Currency value={row.outflow} />
      </Table.Td>
      <Table.Td>
        <Center>
          <Checkbox checked={row.cleared} readOnly />
        </Center>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Group justify="space-between" my="xl" mx="lg">
        <Title>Transactions</Title>
        <NewTransactionModal />
      </Group>
      <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          striped
          highlightOnHover
        >
          <Table.Thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <Table.Tr>
              <SortTh reversed={sortReversed} onSort={sort}>
                Date
              </SortTh>
              <Table.Th w="100%">Notes</Table.Th>
              <Table.Th>Inflow</Table.Th>
              <Table.Th>Outflow</Table.Th>
              <Table.Th>Cleared</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows?.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(data[0]).length}>
                  <Text fw={500} ta="center">
                    No Transactions
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
