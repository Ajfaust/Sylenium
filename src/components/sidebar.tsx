import { useState } from 'react';
import {
  Button,
  Header,
  ListBox,
  ListBoxItem,
  ListBoxSection,
} from 'react-aria-components';
import { IconType } from 'react-icons';
import { PiBank, PiGear, PiTag } from 'react-icons/pi';
import { Account, Ledger } from '../types.ts';

interface NavItem {
  title: string;
  icon: IconType;
  hasSubitems: boolean;
  subitems?: Array<Account>;
  url: string;
}

export const Sidebar = (ledger: Ledger) => {
  const navItems: NavItem[] = [
    {
      title: 'Accounts',
      icon: PiBank,
      hasSubitems: true,
      subitems: ledger.accounts,
      url: '/accounts/$accountId',
    },
    {
      title: 'Categories',
      icon: PiTag,
      hasSubitems: false,
      url: '/categories',
    },
    {
      title: 'Settings',
      icon: PiGear,
      hasSubitems: false,
      url: '/settings',
    },
  ];

  return (
    <ListBox
      aria-label="Sidebar"
      selectionMode="single"
      className="space-y-1 w-full border-3 h-full rounded-lg border-amber-50 p-2 overflow-hidden"
    >
      <ListBoxSection className="py-2 px-4">
        <Header className="text-2xl font-semibold text-indigo-400 my-3 border-b-2 pb-4">
          $ylenium
        </Header>
      </ListBoxSection>
      {navItems.map((item: NavItem) =>
        item.hasSubitems ? (
          <ListBoxSectionWithDropdown
            key={item.title}
            title={item.title}
            icon={item.icon}
            hasSubitems={item.hasSubitems}
            subitems={item.subitems}
            url={item.url}
          />
        ) : (
          <ListBoxSection key={item.title}>
            <ListBoxItem
              textValue={item.title}
              className="group flex items-center rounded-lg p-2 text-amber-50 cursor-pointer hover:bg-indigo-600"
            >
              <item.icon size={25} strokeWidth={1.5} />
              <span className="pl-5 text-lg">{item.title}</span>
            </ListBoxItem>
          </ListBoxSection>
        )
      )}
    </ListBox>
  );
};

const ListBoxSectionWithDropdown = (item: NavItem) => {
  const [isOpen, setIsOpen] = useState(false);

  // @ts-ignore
  return (
    <ListBoxSection className="text-amber-50">
      <ListBoxItem textValue={item.title} className={`group text-amber-50`}>
        <Button
          onPress={() => setIsOpen((prevState) => !prevState)}
          slot="trigger"
          className="w-full h-full flex items-center rounded-lg p-2 cursor-pointer hover:bg-indigo-600"
        >
          <item.icon size={25} strokeWidth={1.5} />
          <span className="pl-5 text-lg">{item.title}</span>
        </Button>
      </ListBoxItem>
      <ListBoxSection
        aria-label={`${item.title}-subitems`}
        className={`border-l-amber-100 border-l-2 ml-2 transition-all ease-in-out duration-300 ${isOpen ? 'h-full' : 'h-0 opacity-0'}`}
      >
        {item.subitems?.map((subitem) => (
          <ListBoxItem
            key={subitem.id}
            href={{
              // @ts-ignore
              to: item.url,
              params: { accountId: subitem.id.toString() },
            }}
            className="ml-2 p-2 cursor-pointer hover:bg-indigo-600 rounded-md text-amber-50"
          >
            {subitem.name}
          </ListBoxItem>
        ))}
      </ListBoxSection>
    </ListBoxSection>
  );
};
