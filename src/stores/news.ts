import { api } from "@/service/api";
import { defineStore } from "pinia";

interface IDataFetch {
  news: any[];
  count: number | null;
  offset: number;
  detailNews: any;
}

export const useNewsStore = defineStore("news", {
  state: (): IDataFetch => ({
    news: [],
    offset: 0,
    count: null,
    detailNews: null
  }),
  getters: {
    getNews: (state) => state.news,
    getCountPage: (state) => state.count,
    getDetailNews: (state) => state.detailNews
  },
  actions: {
    async fetchNews({ limit, offset = 0 }: { limit: number; offset?: number }) {
      if (this.news.length > 0 && this.offset === offset) {
        return;
      }
      try {
        const news = await api.fetchNews({ limit, offset });
        this.offset = offset;
        this.count = news.count;
        this.news = news.results;
      } catch (e: any) {
        return {};
      }
    },
    async fetchDetailNews({ slug }: { slug: string }) {
      try {
        const detail = await api.fetchDetailNews({ slug });
        this.detailNews = detail;
      } catch {
        return {};
      }
    },
    refreshStore() {
      this.news = [];
    }
  }
});
