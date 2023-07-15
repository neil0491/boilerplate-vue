import i18n from "@/i18n";
import { nextTick } from "vue";
import Cookies from "js-cookie";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

import type { Ii18nRoute } from "~/types";

const Trans = {
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE;
  },

  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split(",");
  },

  get t() {
    return i18n.global.t;
  },

  get currentLocale() {
    //@ts-ignore
    return i18n.global.locale.value;
  },

  set currentLocale(newLocale) {
    //@ts-ignore
    i18n.global.locale.value = newLocale;
  },

  async switchLanguage(newLocale: string) {
    await Trans.loadLocaleMessages(newLocale);
    Trans.currentLocale = newLocale;
    Cookies.set(import.meta.env.VITE_COOKIE_LOCALE, newLocale);
    try {
      window.document.querySelector("html")?.setAttribute("lang", newLocale);
      // window.localStorage.setItem("user-locale", newLocale);
    } catch {
      console.warn("Is not Client");
    }
  },

  async loadLocaleMessages(locale: string) {
    if (!i18n.global.availableLocales.includes(locale)) {
      const messages = await import(`@/i18n/locales/${locale}.json`);
      i18n.global.setLocaleMessage(locale, messages.default);
    }

    return nextTick();
  },

  isLocaleSupported(locale: string) {
    return Trans.supportedLocales.includes(locale);
  },

  getUserLocale() {
    try {
      const locale: string =
        //@ts-ignore
        window?.navigator?.language || window?.navigator?.userLanguage || Trans.defaultLocale;

      return {
        locale: locale,
        localeNoRegion: locale.split("-")[0]
      };
    } catch (error) {
      const locale: string = Trans.defaultLocale;
      return {
        locale: locale,
        localeNoRegion: locale.split("-")[0]
      };
    }
  },

  getPersistedLocale() {
    try {
      const persistedLocale: string | null = localStorage?.getItem("user-locale");
      if (persistedLocale && Trans.isLocaleSupported(persistedLocale)) {
        return persistedLocale;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  guessDefaultLocale() {
    const userPersistedLocale = Trans.getPersistedLocale();
    if (userPersistedLocale) {
      return userPersistedLocale;
    }

    const userPreferredLocale = Trans.getUserLocale();

    if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale;
    }

    if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion;
    }

    return Trans.defaultLocale;
  },

  async routeMiddleware(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    const paramLocale: string = to.params.locale as string;
    if (paramLocale === "") {
      await Trans.switchLanguage(Trans.defaultLocale);
      return next();
    }

    if (!Trans.isLocaleSupported(paramLocale) || paramLocale === Trans.defaultLocale) {
      await Trans.switchLanguage(Trans.guessDefaultLocale());
      return next({
        name: to.name?.toString(),
        params: {
          locale: ""
        }
      });
    }

    await Trans.switchLanguage(paramLocale);

    return next();
  },

  i18nRoute(to: Ii18nRoute) {
    return {
      ...to,
      params: {
        locale: Trans.currentLocale === Trans.defaultLocale ? "" : Trans.currentLocale,
        ...to.params
      }
    };
  }
};

export default Trans;
