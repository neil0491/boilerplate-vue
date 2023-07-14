import Trans from "@/i18n/translation";
import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  RouterView,
  type RouteRecordRaw
} from "vue-router";

const routes: readonly RouteRecordRaw[] = [
  {
    path: "/:locale?",
    component: RouterView,
    beforeEnter: Trans.routeMiddleware,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/pages/HomePage.vue")
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/pages/AboutPage.vue")
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/pages/404Page.vue")
  }
];

export function createRouter() {
  const router = _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: routes
  });

  return router;
}
