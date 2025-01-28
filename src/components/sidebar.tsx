import { Dispatch, SetStateAction } from 'react';
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Group,
  Heading,
  Link,
  Separator,
  Toolbar,
} from 'react-aria-components';
import { IconType } from 'react-icons';
import { PiBank, PiCaretDoubleRight, PiGear, PiTag } from 'react-icons/pi';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface NavSubItem {
  title: string;
  id: number;
}

interface NavItem {
  title: string;
  icon: IconType;
  hasSubitems: boolean;
  subitems: NavSubItem[];
  url: string;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navItems: NavItem[] = [
    {
      title: 'Accounts',
      icon: PiBank,
      hasSubitems: true,
      subitems: [
        {
          title: 'Checking',
          id: 2,
        },
        {
          title: 'Savings',
          id: 3,
        },
      ],
      url: '',
    },
    {
      title: 'Categories',
      icon: PiTag,
      hasSubitems: false,
      subitems: [],
      url: '/categories',
    },
    {
      title: 'Settings',
      icon: PiGear,
      hasSubitems: false,
      subitems: [],
      url: '/settings',
    },
  ];

  return (
    <Toolbar
      orientation="vertical"
      className={`top-0 bg-slate-700 text-white transition-all duration-300 ease-in-out text-sm border-2 rounded-md border-b-slate-500 ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <Group className="p-4 flex justify-between items-center">
        <h1
          className={`font-bold overflow-hidden transition-opacity duration-300 text-lg text-nowrap text-indigo-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Sidebar Logo"
        >
          Sylenium
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`hover:bg-slate-500 p-2 rounded-lg ${isOpen && 'rotate-180'} transition-transform duration-300`}
        >
          <PiCaretDoubleRight size={20} strokeWidth={1.5} />
        </button>
      </Group>
      <Separator orientation="horizontal" />
      <Group className="mt-6 px-2">
        {navItems.map((item) =>
          item.hasSubitems ? (
            <Disclosure key={item.title}>
              <Heading>
                <Button
                  slot="trigger"
                  className="flex items-center w-full cursor-pointer hover:bg-indigo-600 rounded-lg p-2"
                >
                  <item.icon size={25} strokeWidth={1.5} />
                  <span className="mx-5 text-lg">{item.title}</span>
                </Button>
              </Heading>
              <DisclosurePanel className="flex flex-col p-2 border-l-1 ml-2">
                {item.subitems.map((si) => (
                  <Link
                    key={si.title}
                    href={{
                      to: '/accounts/$accountId',
                      params: { accountId: si.id.toString() },
                    }}
                    className="react-aria-Button rounded-md hover:bg-indigo-400 p-2 w-full"
                  >
                    {si.title}
                  </Link>
                ))}
              </DisclosurePanel>
            </Disclosure>
          ) : (
            <Link
              key={item.title}
              href={{ to: '/ledgers' }}
              className="flex react-aria-Button items-center p-2 my-2 hover:bg-indigo-600 rounded-lg cursor-pointer"
            >
              <SidebarButtonContent item={item} isOpen={isOpen} />
            </Link>
          )
        )}
      </Group>
    </Toolbar>
  );
};

interface SidebarButtonProps {
  item: NavItem;
  isOpen: boolean;
}

const SidebarButtonContent = ({ item, isOpen }: SidebarButtonProps) => {
  return (
    <>
      <item.icon size={25} strokeWidth={1.5} />
      <span
        className={`ml-4 text-lg text-start whitespace-nowrap overflow-hidden transition-discrete duration-300 w-32 ${isOpen ? 'block' : 'hidden'}`}
      >
        {item.title}
      </span>
    </>
  );
};
