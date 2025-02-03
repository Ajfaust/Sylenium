import { TransactionCategory } from '@/types.ts';
import {
  Button,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
  ListBox,
  ListBoxItem,
} from 'react-aria-components';
import { PiCaretRight } from 'react-icons/pi';

interface CatTableProps {
  categories: Array<TransactionCategory>;
}

export const CategoryTable = ({ categories }: CatTableProps) => {
  return (
    <DisclosureGroup>
      {categories.map((c) => (
        <Disclosure key={c.id} id={c.name}>
          <Heading>
            <Button slot="trigger">
              <PiCaretRight size={10} />
              {c.name}
            </Button>
          </Heading>
          <DisclosurePanel>
            <ListBox>
              {c.subcategories?.map((s) => (
                <ListBoxItem key={s.id}>{s.name}</ListBoxItem>
              ))}
            </ListBox>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
};
