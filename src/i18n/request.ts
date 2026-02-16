import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales, type Locale } from './config';

function isSupported(l: string): l is Locale {
  return (locales as readonly string[]).includes(l);
}

export default getRequestConfig(async ({ locale }) => {
  const resolved: Locale = locale && isSupported(locale) ? locale : defaultLocale;
  const messages = (await import(`./messages/${resolved}.json`)).default;

  return {
    locale: resolved,
    messages,
  };
});
