import { Dispatch, SetStateAction, useState } from 'react';
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
  Link,
} from 'react-aria-components';
import { IconType } from 'react-icons';
import {
  PiBank,
  PiCaretDoubleRight,
  PiCaretDown,
  PiGear,
  PiTag,
} from 'react-icons/pi';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface NavItem {
  title: string;
  icon: IconType;
  hasSubitems: boolean;
  subitems?: NavSubItem[];
  url: string;
}

interface NavSubItem {
  title: string;
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
          url: '/accounts/checking',
        },
        {
          title: 'Savings',
          url: '/accounts/savings',
        },
      ],
      url: '',
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
    <div
      className={`bg-slate-700 text-white transition-all duration-300 ease-in-out text-sm border-2 rounded-md border-b-slate-500 ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1
          className={`font-bold overflow-hidden transition-all duration-300 text-lg text-nowrap text-indigo-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Sidebar Logo"
        >
          Dashboard
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`hover:bg-slate-500 p-2 rounded-lg ${isOpen && 'rotate-180'} transition-transform duration-300`}
        >
          <PiCaretDoubleRight size={20} strokeWidth={1.5} />
        </button>
      </div>
      <div className="mt-6 px-2">
        {navItems.map((item) =>
          item.hasSubitems ? (
            <MenuDisclosure key={item.title} item={item} isOpen={isOpen} />
          ) : (
            <Link
              key={item.title}
              className="flex items-center p-2 hover:bg-slate-500 rounded-lg w-full react-aria-Button cursor-pointer"
            >
              <MenuButtonContent key={item.title} item={item} isOpen={isOpen} />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

interface MenuItemProps {
  item: NavItem;
  isOpen: boolean;
}

const MenuButtonContent = ({ item, isOpen }: MenuItemProps) => {
  return (
    <>
      <item.icon
        size={25}
        strokeWidth={1.5}
        className={`${!isOpen ? 'grow' : ''}`}
      />
      <span
        className={`ml-4 text-lg text-start whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}
      >
        {item.title}
      </span>
    </>
  );
};

const MenuDisclosure = ({ item, isOpen }: MenuItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Disclosure
      key={item.title}
      isExpanded={isExpanded}
      onExpandedChange={setIsExpanded}
      className="transition-all ease-in-out duration-300"
    >
      <Heading>
        <Button
          slot="trigger"
          className="flex items-center p-2 hover:bg-slate-500 rounded-lg w-full cursor-pointer"
        >
          <MenuButtonContent item={item} isOpen={isOpen} />
          <div
            className={`${isExpanded ? 'rotate-180' : ''} transition-transform duration-300`}
          >
            <PiCaretDown size={18} strokeWidth={1.5} />
          </div>
        </Button>
      </Heading>
      <DisclosurePanel>
        {item.subitems?.map((si) => (
          <Link
            href=".."
            key={si.title}
            className="flex items-center p-2 hover:bg-slate-500 rounded-lg cursor-pointer mx-5 text-md"
          >
            {si.title}
          </Link>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
};
