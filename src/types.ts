import { IconType } from 'react-icons';

export interface SidebarItems {
  items: Array<SidebarItem>;
}

export interface SidebarItem {
  label: string;
  href: string;
  icon?: IconType;
  children?: Array<SidebarItem>;
}

export interface Transaction {
  transactionId: number;
  categoryId: number;
  accountId: number;
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

export interface Account {
  accountId: number;
  name: string;
  balance: number;
}
