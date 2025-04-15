import * as z from 'zod';
import config from '@/config/config.ts';

const signUpSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  lastname: z.string().min(4, 'Minimum 4 caractères'),
  firstname: z.string().min(4, 'Minimum 4 caractères'),
  password: z
    .string()
    .min(config.authCodeLength, `Minimum, ${config.authCodeLength} caractères`),
  termOfUse: z.boolean(),
});

const generateOtpSchema = z.object({
  email: z.string().email('Adresse email invalide'),
});
const activeAccountSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  code: z
    .string()
    .length(
      config.authCodeLength,
      `Minimum, ${config.authCodeLength} caractères`,
    ),
});

const signInSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string({ message: `Minimum, 8 caractères` }).length(8),
});

export { signUpSchema, signInSchema, generateOtpSchema, activeAccountSchema };
