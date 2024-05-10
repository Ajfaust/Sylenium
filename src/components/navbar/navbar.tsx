import { useState } from 'react';
import { IconType } from 'react-icons/lib';
import {
  FaMoneyCheckDollar,
  FaFolderClosed,
  FaChevronRight,
} from 'react-icons/fa6';
import { Box, NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface Page {
  icon: IconType;
  label: string;
  path: string;
  children: Page[];
}

const pages: Page[] = [
  {
    icon: FaMoneyCheckDollar,
    label: 'Transactions',
    path: '/ledger/transactions',
    children: [],
  },
  {
    icon: FaFolderClosed,
    label: 'Categories',
    path: '/ledger/categories',
    children: [],
  },
];

export default function NavBar() {
  const [active, setActive] = useState<number>(0);
  const navigate = useNavigate();

  const handleOnClick = (index: number, path: string) => {
    setActive(index);
    navigate(path, { replace: true });
  };

  const items = pages.map((item, index) => (
    <NavLink
      href="#focus"
      key={item.label}
      active={index === active}
      label={item.label}
      rightSection={
        item.children.length > 0 ? <FaChevronRight size="1rem" /> : null
      }
      leftSection={<item.icon size="1rem" />}
      onClick={() => handleOnClick(index, item.path)}
      color="teal"
    />
  ));

  return <Box>{items}</Box>;
}
