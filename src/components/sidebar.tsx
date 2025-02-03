import { Account } from '@/types.ts';
import { useState } from 'react';
import {
  Button,
  Header,
  ListBox,
  ListBoxItem,
  ListBoxSection,
} from 'react-aria-components';
import { PiBank, PiCaretDown, PiStorefront, PiTag } from 'react-icons/pi';

interface Props {
  accounts: Array<Account>;
}

export const Sidebar = ({ accounts }: Props) => {
  return (
    <ListBox
      aria-label="Sidebar"
      selectionMode="single"
      className="space-y-1 w-full border-3 h-full rounded-lg border-amber-50 p-2 overflow-hidden"
    >
      <ListBoxSection className="py-2 px-4" aria-label="SidebarHeader">
        <Header className="text-2xl font-semibold text-indigo-400 my-3 border-b-2 pb-4">
          Sylenium
        </Header>
      </ListBoxSection>
      <ListBoxSection>
        <AccountListItem accounts={accounts} />
        <ListBoxItem
          textValue="Categories"
          href={{
            to: '/categories',
          }}
        >
          <div className="flex items-center text-amber-50 hover:bg-indigo-600 rounded-lg p-2">
            <PiTag size={25} strokeWidth={1.5} />
            <span className="pl-4 text-lg">Categories</span>
          </div>
        </ListBoxItem>
        <ListBoxItem textValue="Vendors" href={{ to: '/vendors' }}>
          <div className="flex items-center text-amber-50 hover:bg-indigo-600 rounded-lg p-2">
            <PiStorefront size={25} strokeWidth={1.5} />
            <span className="pl-4 text-lg">Vendors</span>
          </div>
        </ListBoxItem>
      </ListBoxSection>
    </ListBox>
  );
};

function AccountListItem({ accounts }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnPress() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <ListBoxItem textValue="Accounts" className={`text-amber-50`}>
        <Button
          onPress={() => handleOnPress()}
          slot="trigger"
          className="w-full h-full flex items-center justify-between rounded-lg p-2 cursor-pointer hover:bg-indigo-600"
        >
          <div className="flex items-center">
            <PiBank size={25} strokeWidth={1.5} />
            <span className="pl-5 text-lg">Accounts</span>
          </div>
          <PiCaretDown
            size={15}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </ListBoxItem>
      <ListBoxSection
        aria-label="AccountItems"
        className={`border-l-amber-100 w-full border-l-2 ml-2 overflow-hidden transition-all ease-in-out duration-300 ${isOpen ? '' : 'h-0'}`}
      >
        {accounts.map((account) => (
          <ListBoxItem
            key={account.id}
            textValue={account.name}
            href={{
              to: '/accounts/$accountId',
              params: {
                accountId: account.id.toString(),
              },
            }}
            className="ml-2 p-1 cursor-pointer hover:bg-indigo-600 rounded-lg text-amber-50"
          >
            <span>{account.name}</span>
          </ListBoxItem>
        ))}
      </ListBoxSection>
    </>
  );
}
