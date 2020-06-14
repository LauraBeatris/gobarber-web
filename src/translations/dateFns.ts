import * as dateFnsLocales from "date-fns/locale";
import { Locale } from "date-fns";

import i18n from "./i18n";

interface Locales {
  [key: string]: Locale;
}

const getDateFnsLocale = (): Locale => {
  const locales: Locales = {
    pt: dateFnsLocales.ptBR,
    en: dateFnsLocales.enUS,
    de: dateFnsLocales.de,
  };

  return locales[i18n.language];
};

export default getDateFnsLocale;
