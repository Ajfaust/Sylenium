import { ReactElement } from 'react';
import { IconType } from 'react-icons';

export type Account = {
  id: number;
  financialCategory: FinancialCategory;
  name: string;
  transactions: Array<Transaction>;
};

export type FinancialCategory = {
  id: number;
  name: string;
  type: number;
};

export type Ledger = {
  id: number;
  name: string;
  isActive: boolean;
  accounts: Array<Account>;
  vendors: Array<Vendor>;
  transactionCategories: Array<TransactionCategory>;
  financialCategories: Array<FinancialCategory>;
};

export type LedgerDto = {
  name: string;
  isActive: boolean;
};

export type Transaction = {
  id: number;
  account: Account;
  category: TransactionCategory;
  vendor: Vendor;
  date: Date;
  description: string;
  inflow: number;
  outflow: number;
  cleared: boolean;
};

export type TransactionCategory = {
  id: number;
  parentId?: number;
  name: string;
  subcategories?: Array<TransactionCategory>;
};

export type Vendor = {
  id: number;
  name: string;
};

export type NavItem = {
  label: string;
  link: ReactElement;
  icon?: IconType;
  children?: () => Array<NavItem>;
};
