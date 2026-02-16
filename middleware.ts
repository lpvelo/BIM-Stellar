import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};
