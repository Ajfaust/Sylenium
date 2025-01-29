import {
  Header,
  ListBox,
  ListBoxItem,
  ListBoxSection,
} from 'react-aria-components';
import { IconType } from 'react-icons';
import { PiBank, PiGear, PiTag } from 'react-icons/pi';

interface NavSubItem {
  title: string;
  id: number;
}

interface NavItem {
  title: string;
  icon: IconType;
  hasSubitems: boolean;
  subitems: Array<NavSubItem>;
  url: string;
}

export const Sidebar = () => {
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
      url: '/accounts/$accountId',
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
    <ListBox
      aria-label="Sidebar"
      selectionMode="single"
      className="space-y-1 w-full border-3 h-full rounded-lg border-amber-50 p-2"
    >
      <ListBoxSection className="py-2 px-4">
        <Header className="text-2xl font-semibold text-indigo-400 my-3 border-b-2 pb-4">
          $ylenium
        </Header>
      </ListBoxSection>
      {navItems.map((item: NavItem) => (
        <ListBoxSection key={item.title}>
          <ListBoxItem
            textValue={item.title}
            isDisabled={item.hasSubitems}
            className={`group flex items-center rounded-lg p-2 text-amber-50 ${item.hasSubitems ? '' : 'hover:bg-indigo-600 cursor-pointer'}`}
          >
            <item.icon size={25} strokeWidth={1.5} />
            <span className="pl-5 text-lg">{item.title}</span>
          </ListBoxItem>
          {item.hasSubitems && (
            <ListBoxSection
              aria-label={`${item.title}-subitems`}
              className="border-l-amber-100 border-l-2 ml-2"
            >
              {item.subitems?.map((subitem) => (
                <ListBoxItem
                  key={subitem.id}
                  className="ml-2 p-2 cursor-pointer hover:bg-indigo-600 rounded-md text-amber-50"
                >
                  {subitem.title}
                </ListBoxItem>
              ))}
            </ListBoxSection>
          )}
        </ListBoxSection>
      ))}
    </ListBox>
  );
};
