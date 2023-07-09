import "./assets/main.css";

import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import { createRouter } from "./router";
import i18n from "./i18n";
import Trans from "./i18n/translation";

// const app = createApp(App);

// app.use(createPinia());
// app.use(router);

// app.mount("#app");

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  const router = createRouter();
  app.use(router);
  app.use(i18n);

  app.config.globalProperties.$i18nRoute = Trans.i18nRoute;

  return { app, router, i18n };
}
