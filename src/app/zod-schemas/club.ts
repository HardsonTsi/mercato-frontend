import * as z from 'zod';

export const clubSchema = z.object({
  name: z.string(),
  country: z.string(),
  budget: z.coerce.number().gte(0, 'Le budget doit-être supérieur à 0.'),
  logo: z.string().min(0),
});
