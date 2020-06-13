import * as dateFnsLocales from 'date-fns/locale';
import { Locale } from 'date-fns';

import i18n from './i18n';

console.log(i18n.language);

/**
 * Provides the Locale object to translate date-fns functions.
 * Defaults to enUS if not valid.
 */
const getDateFnsLocale = (): Locale =>
  ({
    pt: dateFnsLocales.ptBR,
    en: dateFnsLocales.enUS,
    de: dateFnsLocales.de,
  }.pt || dateFnsLocales.enUS);

export default getDateFnsLocale;
