'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

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

  const columnHelper = createColumnHelper<Transaction>();
  const columns = [
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => new Date(info.getValue<Date>()).toLocaleDateString(),
    }),
    columnHelper.accessor('category.name', {
      header: 'Category',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('vendor.name', {
      header: 'Vendor',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Notes',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('inflow', {
      header: 'Inflow',
      cell: (info) => formatter.format(info.getValue()),
    }),
    columnHelper.accessor('outflow', {
      header: 'Outflow',
      cell: (info) => formatter.format(info.getValue()),
    }),
    columnHelper.accessor('cleared', {
      header: 'Cleared',
      cell: (info) => info.getValue() && <PiCheckCircleFill size={20} />,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    data.length > 0 && (
      <Table>
        <Table.Thead>
          <Table.Tr>
            {table.getHeaderGroups().map((group) => {
              return group.headers.map((header) => (
                <Table.Th key={header.id}>
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </Table.Th>
              ));
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id} className="hover:bg-indigo-400">
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    )
  );
};
