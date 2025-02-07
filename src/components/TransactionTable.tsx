import { Table } from '@mantine/core';
import { PiCheckCircleFill } from 'react-icons/pi';
import { Transaction } from '../types.ts';

type TransactionTableProps = {
  data: Transaction[];
};

export const TransactionTable = ({ data }: TransactionTableProps) => {
  const formatter = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'USD',
  });

  const columnNames = [
    'Date',
    'Vendor',
    'Category',
    'Description',
    'Inflow',
    'Outflow',
    'Cleared',
  ];

  return (
    data.length > 0 && (
      <Table>
        <Table.Thead>
          <Table.Tr>
            {columnNames.map((c) => (
              <Table.Th key={c}>{c}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((d) => (
            <Table.Tr key={d.id}>
              <Table.Td>{new Date(d.date).toLocaleDateString()}</Table.Td>
              <Table.Td>{d.vendor.name}</Table.Td>
              <Table.Td>{d.category.name}</Table.Td>
              <Table.Td>{d.description}</Table.Td>
              <Table.Td>{formatter.format(d.inflow)}</Table.Td>
              <Table.Td>{formatter.format(d.outflow)}</Table.Td>
              <Table.Td>
                {d.cleared && <PiCheckCircleFill size={18} strokeWidth={1.5} />}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    )
  );
};
