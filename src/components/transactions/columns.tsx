import { ColumnDef, Row } from '@tanstack/react-table';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { FaCheck, FaEllipsis } from 'react-icons/fa6';

import { DataTableColumnHeader } from '../data-table/header';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export interface Transaction {
  id: number;
  date: Date;
  notes?: string;
  inflow: number;
  outflow: number;
  cleared: boolean;
}

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
          <FaCheck className="mx-auto size-4 text-primary" />
        )
      );
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <FaEllipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
