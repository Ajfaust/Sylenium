import { useGetCategory } from '@/hooks/categories/get-categories';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { CategoryDropdownMenu } from './category-dropdown-menu';

export function CategoryAccordion({ id }: { id: number }) {
  const { data: category } = useGetCategory(id);
  if (!category) {
    return;
  }

  return (
    <AccordionItem value={category.name}>
      <AccordionTrigger>{category.name}</AccordionTrigger>
      <AccordionContent>
        {category.subcategories && (
          <Table>
            <TableBody>
              {category.subcategories.map((sc) => (
                <TableRow key={sc.categoryId}>
                  <TableCell className="font-medium">{sc.name}</TableCell>
                  <TableCell className="text-right">
                    <CategoryDropdownMenu id={sc.categoryId} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
