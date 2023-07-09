import { LocationQueryRaw, RouteParams, RouteLocationRaw } from "vue-router";

export interface Ii18nRoute extends RouteLocationRaw {
  name: string;
  params?: RouteParams;
  query?: LocationQueryRaw;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $i18nRoute: (route: Ii18nRoute) => Ii18nRoute;
    $route: Ii18nRoute;
  }
}