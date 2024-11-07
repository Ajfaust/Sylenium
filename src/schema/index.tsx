import { z } from 'zod';

import { Transaction } from '@/types.ts';

export const formSchema = z.object({
  transactionId: z.number(),
  categoryId: z.number(),
  accountId: z.number(),
  date: z.coerce.date({
    required_error: 'A transaction date is required.',
  }),
  notes: z.string(),
  inflow: z.coerce
    .number({
      required_error: 'An inflow amount is required.',
    })
    .nonnegative(),
  outflow: z.coerce
    .number({
      required_error: 'An outflow amount is required.',
    })
    .nonnegative(),
  cleared: z.boolean(),
}) satisfies z.ZodType<Transaction>;
