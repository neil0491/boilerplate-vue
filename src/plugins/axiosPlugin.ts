import { fetchData } from "@/service/api";
import type { App } from "vue";

export const axiosPlugin = {
    install: (app: App) => {
      //@ts-ignore
      if (app.vueAxiosInstalled) {
        return;
      }
      app.config.globalProperties.$fetchData = fetchData;
      //@ts-ignore
      app.vueAxiosInstalled = true;
    }
  };