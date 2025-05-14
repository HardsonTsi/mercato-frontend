import { z } from 'zod';


export const playerSchema = z.object({
  lastname: z.string().min(1, 'Le nom ne peut pas être vide.'),
  firstname: z.string().min(1, 'Le prénom ne peut pas être vide.'),
  email: z.string().email('L\'adresse e-mail n\'est pas valide.'),
  number: z.number().int('Le numéro doit être un entier.')
    .nonnegative('Le numéro ne peut pas être négatif.').nullable(),
  price: z.number().nonnegative('Le prix ne peut pas être négatif.'),
  available: z.boolean(),
  country: z.string().length(2, 'Le pays ne peut pas être vide.'),
  birthday: z.coerce.date(),
  position: z.string(),
});
