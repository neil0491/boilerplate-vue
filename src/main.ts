import "./assets/main.css";

import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import { router } from "./router";
import i18n from "./i18n";
import Trans from "./i18n/translation";
import { createHead } from "unhead";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.use(router);
  app.use(i18n);

  app.config.globalProperties.$i18nRoute = Trans.i18nRoute;

  const head = createHead() as any;
  app.use(head);

  return { app, router, i18n, pinia, head };
}
