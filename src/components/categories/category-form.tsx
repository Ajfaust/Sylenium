import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateCategory } from '@/hooks/categories/create-category';
import { Category } from '@/types';

import { Button } from '../ui/button';
import { DialogClose, DialogFooter, DialogHeader } from '../ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function CategoryForm({
  categories,
  afterSave,
}: {
  categories: Partial<Category>[];
  afterSave: () => void;
}) {
  const { mutateAsync: createAsync, isPending: createPending } =
    useCreateCategory();

  const formSchema = z.object({
    name: z.string().trim().min(1, 'Name cannot be empty or only whitespace'),
    parentId: z.coerce
      .number()
      .nullable()
      .transform((v) => (v !== null && v < 0 ? null : v)),
  }) satisfies z.ZodType<Partial<Category>>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: '',
      parentId: null,
    },
  });

  const onSubmit = (values: Partial<Category>) => {
    return createAsync(values).then(afterSave);
  };

  return (
    <>
      <DialogHeader>New Category</DialogHeader>
      <Form {...form}>
        <form
          className="mt-2 space-y-8"
          onSubmit={form.handleSubmit((values) => onSubmit(values))}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category</FormLabel>
                <FormDescription>
                  If you would like this category to be a subcategory, pick its
                  desired parent category.
                </FormDescription>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Parent Category..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="-1">None</SelectItem>
                    {categories.map((c) => (
                      <SelectItem
                        key={c.categoryId}
                        value={c.categoryId?.toString() ?? '-1'}
                        defaultValue="-1"
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {createPending ? <Loader2 className="animate-spin" /> : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
