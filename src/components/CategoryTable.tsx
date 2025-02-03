import { TransactionCategory } from '@/types.ts';
import { useState } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <DisclosureGroup className="flex justify-center w-100 text-amber-50 ml-10 mt-10">
      {categories.map((c) => (
        <Disclosure
          key={c.id}
          id={c.name}
          isExpanded={isExpanded}
          className="w-full"
        >
          <Heading>
            <Button
              slot="trigger"
              onPress={() => setIsExpanded(!isExpanded)}
              className="flex items-center"
            >
              <PiCaretRight
                size={15}
                className={`transition-all duration-300 mr-5 ${isExpanded ? 'rotate-90' : ''} hover:fill-indigo-600`}
              />
              <span className="p-2">{c.name}</span>
            </Button>
          </Heading>
          <DisclosurePanel>
            <ListBox className="ml-5">
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
