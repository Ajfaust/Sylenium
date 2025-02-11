import { TransactionCategory } from '@/types.ts';
import { Accordion, Button, Divider, Flex, Menu, Stack } from '@mantine/core';
import { PiDotsThree, PiPencil, PiTrash } from 'react-icons/pi';

interface CategoryProps {
  categories: Array<Partial<TransactionCategory>>;
}

export const CategoryAccordion = ({ categories }: CategoryProps) => {
  return (
    <Accordion multiple aria-label="Transaction Category Accordion">
      {categories.map((c) => (
        <Accordion.Item
          key={c.name}
          value={c.name ?? ''}
          aria-label={`${c.name} category`}
        >
          <Accordion.Control>{c.name}</Accordion.Control>
          <Accordion.Panel>
            {c.subcategories && (
              <SubcategoryList categories={c.subcategories} />
            )}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

const SubcategoryList = ({ categories: subcategories }: CategoryProps) => {
  return (
    <Stack>
      {subcategories.map((sc, idx) => (
        <>
          {idx > 0 && <Divider my="md" />}
          <Flex key={idx} justify="space-between">
            {sc.name}
            <Menu
              offset={0}
              transitionProps={{ transition: 'pop', duration: 150 }}
              withArrow
            >
              <Menu.Target>
                <Button
                  variant="transparent"
                  aria-label={`${sc.name} category menu`}
                >
                  <PiDotsThree size={20} strokeWidth={1.5} />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<PiPencil size={15} strokeWidth={1.5} />}
                  aria-label={`Edit Category ${sc.name}`}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  leftSection={<PiTrash size={15} strokeWidth={1.5} />}
                  aria-label={`Delete Category ${sc.name}`}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </>
      ))}
    </Stack>
  );
};
