import { Accordion, Group, Loader, Text, Title, Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import NewCategory from './newCategory';

interface Category {
  name: string;
  subcategories: string[];
}

export default function Categories() {
  // const { isLoading, isFetching, data, error } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => {
  //     return fetch('/api/categories')
  //       .then((res) => res.json())
  //       .catch((error) => console.log(error));
  //   },
  // });
  const data = [
    {
      name: 'Bills',
      subcategories: ['Rent', 'Electricity', 'Phone', 'Internet'],
    },
  ];

  const categories = data?.map((c: Category) => (
    <Accordion.Item value={c.name}>
      <Accordion.Control>{c.name}</Accordion.Control>
      <Accordion.Panel>
        {c.subcategories.map((sc: string) => (
          <Accordion.Panel>{sc}</Accordion.Panel>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  const parentCategories = data
    ?.filter((c: Category) => c.subcategories.length === 0)
    .map((c: Category) => c.name);

  return (
    <>
      <Group justify="space-between" my="xl" mx="lg">
        <Title>Transactions</Title>
        <NewCategory parentCategories={parentCategories} />
      </Group>
      {/* {(isLoading || isFetching) && <Loader color="grape" />}
      {data && !isLoading && !isFetching && (
        <Accordion multiple chevronPosition="left" maw={800} mx="auto">
          {categories}
        </Accordion>
      )} */}
      <Accordion
        multiple
        chevronPosition="left"
        maw={800}
        mx="auto"
        transitionDuration={500}
      >
        {data?.map((c: Category) => (
          <Accordion.Item value={c.name}>
            <Accordion.Control>{c.name}</Accordion.Control>
            <Accordion.Panel>
              {c.subcategories.map((sc: string) => (
                <Box>{sc}</Box>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      {data?.length === 0 && (
        <span>No categories. Click 'New Category' to make a new one.</span>
      )}
    </>
  );
}
