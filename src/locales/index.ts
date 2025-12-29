import type { Locale } from '../types';
import { en } from './en';
import { es } from './es';

export const translations: Record<Locale, typeof en> = {
  en,
  es,
};
