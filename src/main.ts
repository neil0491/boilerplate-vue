import "./assets/main.css";

import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import { router } from "./router";
import i18n from "./i18n";
import Trans from "./i18n/translation";
import { createHead } from "unhead";
import { axiosPlugin } from "./plugins/axiosPlugin";

export async function createApp(cookie?: any) {
  if (cookie?.["userLocale"]) {
    //@ts-ignore
    // i18n.global.locale.value = cookie["userLocale"];
    await Trans.switchLanguage(cookie["userLocale"]);
  }
  //@ts-ignore

  console.log(i18n.global.locale.value);
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.use(router);
  app.use(i18n);

  app.config.globalProperties.$i18nRoute = Trans.i18nRoute;

  const head = createHead() as any;
  app.use(head);
  app.use(axiosPlugin);

  return { app, router, i18n, pinia, head };
}
