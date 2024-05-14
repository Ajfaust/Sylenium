import { IconType } from 'react-icons';

export interface SidebarItems {
  items: Array<{
    label: string;
    href: string;
    icon?: IconType;
  }>;
}
