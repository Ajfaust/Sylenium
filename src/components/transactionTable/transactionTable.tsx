import { useState } from "react";
import {
  ScrollArea,
  Table,
  Group,
  UnstyledButton,
  Text,
  Center,
  Checkbox,
  Button,
  rem,
  Title,
  NumberFormatter,
} from "@mantine/core";
import { FaChevronUp, FaChevronDown, FaPlus } from "react-icons/fa6";
import classes from "./transactionTable.module.css";

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

function SortTh({ children, reversed, onSort }: SortThProps) {
  const Icon = reversed ? FaChevronUp : FaChevronDown;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
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

function sortData(data: Transaction[], reversed: boolean) {
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

const data: Transaction[] = [
  {
    transactionId: 0,
    date: new Date(2024, 5, 4),
    notes: "Sample transaction",
    inflow: 0,
    outflow: 12.12,
    cleared: true,
  },
  {
    transactionId: 1,
    date: new Date(2024, 5, 4),
    notes: "Sample transaction",
    inflow: 0,
    outflow: 5.78,
    cleared: true,
  },
  {
    transactionId: 2,
    date: new Date(2024, 5, 6),
    notes: "Sample transaction",
    inflow: 33,
    outflow: 0,
    cleared: true,
  },
  {
    transactionId: 3,
    date: new Date(2024, 4, 6),
    notes: "Sample transaction",
    inflow: 0,
    outflow: 10,
    cleared: true,
  },
];

export function TransactionTable() {
  const [sortedData, setSortedData] = useState<Transaction[]>(data);
  const [sortReversed, setSortReversed] = useState<boolean>(false);

  const sort = () => {
    setSortReversed(!sortReversed);
    setSortedData(sortData(data, sortReversed));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.transactionId}>
      <Table.Td>{row.date.toLocaleDateString()}</Table.Td>
      <Table.Td>{row.notes}</Table.Td>
      <Table.Td>
        <NumberFormatter
          value={row.inflow}
          decimalScale={2}
          prefix="$"
          allowNegative={false}
        />
      </Table.Td>
      <Table.Td>
        <NumberFormatter
          value={row.outflow}
          decimalScale={2}
          prefix="$"
          allowNegative={false}
        />
      </Table.Td>
      <Table.Td>
        <Checkbox checked={row.cleared} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Group justify="space-between">
        <Title>Transactions</Title>
        <Button leftSection={<FaPlus size={rem(16)} />}>New Transaction</Button>
      </Group>
      <ScrollArea>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
          striped
          highlightOnHover
        >
          <Table.Tbody>
            <Table.Tr>
              <SortTh reversed={sortReversed} onSort={sort}>
                Date
              </SortTh>
              <Table.Th>Notes</Table.Th>
              <Table.Th>Inflow</Table.Th>
              <Table.Th>Outflow</Table.Th>
              <Table.Th>Cleared</Table.Th>
            </Table.Tr>
          </Table.Tbody>
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
