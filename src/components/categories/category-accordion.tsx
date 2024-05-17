import { Category } from '@/types';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';

export function CategoryAccordion({ category }: { category: Category }) {
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
