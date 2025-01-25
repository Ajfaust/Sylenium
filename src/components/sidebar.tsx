import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-aria-components';
import { IconType } from 'react-icons';
import { PiBank, PiCaretDoubleRight, PiGear, PiTag } from 'react-icons/pi';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface NavItem {
  title: string;
  icon: IconType;
  url: string;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navItems: NavItem[] = [
    {
      title: 'Accounts',
      icon: PiBank,
      url: '',
    },
    {
      title: 'Categories',
      icon: PiTag,
      url: '/categories',
    },
    {
      title: 'Settings',
      icon: PiGear,
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
          Sylenium
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`hover:bg-slate-500 p-2 rounded-lg ${isOpen && 'rotate-180'} transition-transform duration-300`}
        >
          <PiCaretDoubleRight size={20} strokeWidth={1.5} />
        </button>
      </div>
      <div className="mt-6 px-2">
        {navItems.map((item) => (
          <SidebarButton key={item.title} item={item} isOpen={isOpen} />
        ))}
      </div>
    </div>
  );
};

interface SidebarButtonProps {
  item: NavItem;
  isOpen: boolean;
}

const SidebarButton = ({ item, isOpen }: SidebarButtonProps) => {
  return (
    <Link className="flex items-center p-2 hover:bg-slate-500 rounded-lg w-full react-aria-Button cursor-pointer">
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
    </Link>
  );
};
