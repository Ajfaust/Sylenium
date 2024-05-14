import { ColumnDef, Row } from '@tanstack/react-table';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { FaEllipsis } from 'react-icons/fa6';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export type Transaction = {
  id: number;
  date: Date;
  notes?: string;
  inflow: number;
  outflow: number;
  cleared: boolean;
};

const currencyHeader = (title: string) => {
  return <div className="text-right">{title}</div>;
};

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
    header: 'Date',
    cell: ({ row }) => {
      dayjs.extend(localizedFormat);
      const date = dayjs(row.getValue('date')).format('L');
      return <div className="font-medium">{date}</div>;
    },
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
  },
  {
    accessorKey: 'inflow',
    header: () => currencyHeader('Inflow'),
    cell: ({ row }) => currencyCell(row, 'inflow'),
  },
  {
    accessorKey: 'outflow',
    header: () => currencyHeader('Outflow'),
    cell: ({ row }) => currencyCell(row, 'outflow'),
  },
  {
    accessorKey: 'cleared',
    header: () => <div className="text-center">Cleared</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Checkbox id="cleared" checked={row.getValue('cleared')} disabled />
        </div>
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
