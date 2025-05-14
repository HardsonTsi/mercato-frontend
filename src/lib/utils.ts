import { type ClassValue, clsx } from 'clsx';
import { Country } from 'country-state-city';
import { twMerge } from 'tailwind-merge';
import { ICountry } from 'country-state-city/lib/interface';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number | undefined,
  locale: string = 'en-US',
  currency: string = 'USD',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount || 0);
}

export const getCountryByCode = (code: string): ICountry | undefined => {
  return Country.getCountryByCode(code);
};
