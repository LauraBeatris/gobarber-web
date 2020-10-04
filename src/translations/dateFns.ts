import * as dateFnsLocales from "date-fns/locale";
import { Locale } from "date-fns";

import i18n from "./i18n";

interface Locales {
  [key: string]: Locale;
}

/**
 * Returns the date-fns locale according to i18n
 */
const getDateFnsLocale = (): Locale => {
  const locales: Locales = {
    pt: dateFnsLocales.ptBR,
    en: dateFnsLocales.enUS,
  };

  return locales[i18n.language];
};

export default getDateFnsLocale;
