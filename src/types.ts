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

export interface Account {
  accountId: number;
  name: string;
  balance: number;
}
