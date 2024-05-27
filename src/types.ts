import { IconType } from 'react-icons';

export interface SidebarItems {
  items: Array<{
    label: string;
    href: string;
    icon?: IconType;
  }>;
}

export interface Transaction {
  transactionId: number;
  date: Date;
  notes?: string;
  inflow: number;
  outflow: number;
  cleared: boolean;
}

export interface Category {
  categoryId: number;
  name: string;
  parentId: number | null;
  subcategories?: Category[];
}

export interface FinancialAccount {
  financialAccountId: number;
  name: string;
  transactions: Transaction[];
}
