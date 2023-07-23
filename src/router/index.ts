import Trans from "@/i18n/translation";
import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  RouterView,
  type RouteRecordRaw,
  type RouteLocationNormalized,
  type NavigationGuardNext
} from "vue-router";

const routes: readonly RouteRecordRaw[] = [
  {
    path: "/:locale?",
    component: RouterView,
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
      },
      {
        path: "news/:slug",
        name: "DetailPage",
        component: () => import("@/pages/DetailPage.vue")
      },
      {
        path: "not-found",
        name: "NotFound",
        component: () => import("@/pages/404Page.vue")
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    redirect: (to) => {
      const locale = to?.params?.catchAll?.toString().split("/")[0] || "";
      return Trans.i18nRoute({ name: "NotFound", params: { locale } });
    }
  }
];

function createRouter() {
  const router = _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: routes
  });

  router.beforeEach(
    (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
      Trans.routeMiddleware(to, _from, next);
    }
  );

  return router;
}

export const router = createRouter();
