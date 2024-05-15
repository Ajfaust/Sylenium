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
  ledgerId: number;
  date: Date;
  notes?: string;
  inflow: number;
  outflow: number;
  cleared: boolean;
}
