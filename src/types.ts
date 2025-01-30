export interface Account {
  id: number;
  financialCategory: FinancialCategory;
  name: string;
}

export interface FinancialCategory {
  id: number;
  name: string;
  type: number;
}

export interface Ledger {
  id: number;
  name: string;
  accounts: Array<Account>;
}
