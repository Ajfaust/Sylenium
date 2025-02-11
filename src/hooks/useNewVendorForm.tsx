import { SyleniumModalProps, Vendor } from '@/types.ts';
import { createVendor } from '@/utils/vendors.tsx';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { z } from 'zod';

type NewVendorSchema = {
  name: string;
};

export function useNewVendorForm({ ledgerId, closeModal }: SyleniumModalProps) {
  const [errors, setErrors] = useState<string | null>(null);

  const schema: z.ZodType<NewVendorSchema> = z.object({
    name: z.string().max(200, 'Name cannot be more than 200 characters'),
  });

  const form = useForm<NewVendorSchema>({
    mode: 'uncontrolled',
    initialValues: { name: '' },
    validate: zodResolver(schema),
  });

  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (v: Partial<Vendor>) => createVendor(v),
    onSuccess: () => {
      void client.invalidateQueries({
        queryKey: ['vendors', '/api/ledgers', ledgerId.toString()],
      });
      if (closeModal) closeModal();
      setErrors(null);
    },
    onError: (error) => setErrors(error.message),
  });

  const handleSubmit = (values: typeof form.values) => {
    const { data, error } = schema.safeParse(values);
    if (error) {
      setErrors(error.message);
      return;
    }

    const vendor: Partial<Vendor> = {
      ledgerId: ledgerId,
      name: data.name,
    };

    mutation.mutate(vendor);
  };

  return { form, handleSubmit, errors };
}
