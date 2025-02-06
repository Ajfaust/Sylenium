import { NewAccountModal } from '@/components/NewAccountModal.tsx';
import { Account, NavItem } from '@/types.ts';
import {
  AppShell,
  AppShellNavbar,
  AppShellNavbarProps,
  NavLink,
  Text,
} from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { cloneElement, useState } from 'react';
import {
  PiBank,
  PiCaretRight,
  PiHouse,
  PiPlus,
  PiStorefront,
  PiTag,
} from 'react-icons/pi';

interface NavbarProps extends AppShellNavbarProps {
  accounts: Array<Account>;
}

export const Navbar = ({ accounts, ...props }: NavbarProps) => {
  const [activeItem, setActiveItem] = useState(0);
  const [activeChild, setActiveChild] = useState(-1);

  const navItems: Array<NavItem> = [
    {
      icon: PiHouse,
      link: <Link to="/dashboard" />,
      label: 'Home',
    },
    {
      icon: PiBank,
      label: 'Accounts',
      link: <Link to="/accounts/$accountId" params={{ accountId: '0' }} />,
      children: () => {
        let map = accounts.map(
          (a): NavItem => ({
            label: a.name,
            link: (
              <Link
                to="/accounts/$accountId"
                params={{ accountId: a.id.toString() }}
              />
            ),
          })
        );
        map.push({
          icon: PiPlus,
          label: 'New Account',
          link: <NewAccountModal />,
        });
        return map;
      },
    },
    {
      icon: PiTag,
      label: 'Categories',
      link: <Link to="/categories" />,
    },
    {
      icon: PiStorefront,
      label: 'Vendors',
      link: <Link to="/vendors" />,
    },
  ];

  return (
    <AppShellNavbar {...props}>
      <AppShell.Section>
        <Text size="xl">Hello</Text>
      </AppShell.Section>
      <AppShell.Section grow>
        {navItems.map((item, index) => (
          <NavLink
            key={item.label}
            m={5}
            variant="filled"
            label={<Text>{item.label}</Text>}
            active={index === activeItem}
            leftSection={item.icon && <item.icon size={25} strokeWidth={1.5} />}
            rightSection={
              item.children && (
                <PiCaretRight
                  size={16}
                  strokeWidth={1.5}
                  className="mantine-rotate-rtl"
                />
              )
            }
            onClick={() => {
              if (!item.children && item.label != 'Accounts')
                setActiveItem(index);
              setActiveChild(-1);
            }}
            renderRoot={(props) => cloneElement(item.link, { ...props })}
            className="rounded-lg"
          >
            {item.children && (
              <div className={`border-dashed border-l border-l-blue-600`}>
                {item.children().map((c, cIndex) => (
                  <NavLink
                    key={c.label}
                    variant="subtle"
                    m={5}
                    label={<Text>{c.label}</Text>}
                    active={cIndex === activeChild}
                    leftSection={
                      c.icon && <c.icon size={15} strokeWidth={1.5} />
                    }
                    onClick={() => {
                      if (activeItem !== index) setActiveItem(index);
                      if (c.label != 'New Account') setActiveChild(cIndex);
                    }}
                    renderRoot={(props) => cloneElement(c.link, { ...props })}
                    className={`rounded-lg ${c.label == 'New Item' ? 'opacity-50 text-gray-500' : ''}`}
                  />
                ))}
              </div>
            )}
          </NavLink>
        ))}
      </AppShell.Section>
    </AppShellNavbar>
  );
};
