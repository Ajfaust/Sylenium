'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from 'react-aria-components';
import { PiCheck } from 'react-icons/pi';
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
      cell: (info) => info.getValue() && <PiCheck size={15} />,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    data.length > 0 && (
      <div className="mt-6 mx-5 rounded-lg overflow-hidden border border-border w-auto">
        <Table className="border w-full rounded-lg">
          <TableHeader className="bg-secondary">
            {table.getHeaderGroups().map((group) => {
              return group.headers.map((header) => (
                <Column key={header.id} isRowHeader={true}>
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </Column>
              ));
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <Row key={row.id} className="hover:bg-indigo-400">
                {row.getVisibleCells().map((cell) => (
                  <Cell key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                ))}
              </Row>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
};
