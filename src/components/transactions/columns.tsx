import { ColumnDef, Row } from '@tanstack/react-table';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { FaCircleCheck } from 'react-icons/fa6';

import { Transaction } from '@/types';

import { DataTableColumnHeader } from '../data-table/header';
import { TransactionDropdownMenu } from './dropdown-menu';

const currencyCell = (row: Row<Transaction>, accessorKey: string) => {
  const amount: number = row.getValue(accessorKey);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount);
  return <div className="text-right font-medium">{formatted}</div>;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    // Hidden row so we can access transaction ID
    accessorKey: 'transactionId',
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    enableSorting: true,
    sortingFn: 'datetime',
    cell: ({ row }) => {
      dayjs.extend(localizedFormat);
      const date = dayjs(row.getValue('date')).format('L');
      return <div className="font-medium">{date}</div>;
    },
  },
  {
    accessorKey: 'notes',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
  },
  {
    accessorKey: 'inflow',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Inflow"
        className="justify-end"
      />
    ),
    enableSorting: true,
    sortingFn: 'alphanumeric',
    cell: ({ row }) => currencyCell(row, 'inflow'),
  },
  {
    accessorKey: 'outflow',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Outflow"
        className="justify-end"
      />
    ),
    enableSorting: true,
    sortingFn: 'alphanumeric',
    cell: ({ row }) => currencyCell(row, 'outflow'),
  },
  {
    accessorKey: 'cleared',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Cleared"
        className="justify-center"
      />
    ),
    enableSorting: true,
    sortingFn: 'basic',
    cell: ({ row }) => {
      return (
        row.getValue('cleared') && (
          <FaCircleCheck className="mx-auto size-4 text-primary" />
        )
      );
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <TransactionDropdownMenu id={row.getValue('transactionId')} />
    ),
  },
];
