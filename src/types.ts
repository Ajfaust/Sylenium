import { ReactElement } from 'react';
import { IconType } from 'react-icons';

export type Account = {
  id: number;
  financialCategory: FinancialCategory;
  ledger: Ledger;
  ledgerId?: number;
  faCategoryId?: number;
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

export type Transaction = {
  id: number;
  account: Account;
  accountId: number;
  category: TransactionCategory;
  categoryId: number;
  vendor: Vendor;
  vendorId: number;
  date: Date;
  description: string;
  inflow: number;
  outflow: number;
  cleared: boolean;
};

export type TransactionCategory = {
  id: number;
  ledgerId: number;
  parentId?: number;
  name: string;
  subcategories?: Array<Partial<TransactionCategory>>;
};

export type AccountCategory = {
  id: number;
  name: string;
  type: AccountType;
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

export enum AccountType {
  Asset,
  Liability,
}
