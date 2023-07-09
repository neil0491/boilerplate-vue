//@ts-ignore
import { createI18n } from 'vue-i18n'

import pluralRules from "./rules/pluralization"
import numberFormats from "./rules/numbers.js"
import datetimeFormats from "./rules/datetime.js"
//@ts-ignore
import en from "./locales/en.json"

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages: { en },
    runtimeOnly: false,
    pluralRules,
    numberFormats,
    datetimeFormats
  })