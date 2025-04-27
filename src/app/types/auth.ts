import * as z from 'zod';
import { activeAccountSchema } from '@/app/zod-schemas/auth.ts';
import { Club } from '@/app/types/club.ts';

export type SignUpType = {
  email: string;
  firstname: string;
  lastname: string;
};

export type SignInType = {
  email: string;
  passowrd: string;
};

export type UserType = {
  email: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
  club: Club;
};

export type AuthType = {
  user: UserType;
  token: string;
  refresh_token: string;
};

export type ActiveAccountType = z.infer<typeof activeAccountSchema>;
