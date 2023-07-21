import { router } from "@/router";
import { api } from "@/service/api";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";

interface IDataFetch {
  news: any[];
  status: "init" | "loading" | "loaded" | "error" | 404;
}

export const useNewsStore = defineStore("news", {
  state: (): IDataFetch => ({
    news: [],
    status: "init"
  }),
  getters: {
    getNews: (state) => state.news,
    getStatus: (state) => state.status
  },
  actions: {
    async fetchNews() {
      try {
        this.status = "loading";
        const news = await api.fetchNews();
        this.news = news.results;
        this.status = "loaded";
      } catch (e: any) {
        if (e?.response?.status === 404) {
          this.status = 404;
          router.push({ name: "NotFound" });
        } else {
          this.status = "error";
        }
        return e;
      }
    },
    refreshStore() {
      this.news = [];
    }
  }
});
