import axios from "axios";
import { defineStore } from "pinia";
interface IDataFetch {
  news: any[];
  status: "init" | "loading" | "loaded";
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
      if (this.news.length > 0) {
        return;
      }
      this.status = "loading";
      await axios
        .get("https://api.zamon.uz/api/v3/uz/news/list")
        .then((res) => {
          this.status = "loaded";
          this.news = res.data.results;
        })
        .catch((err) => {
          this.status = "loaded";
          console.log(err);
        });
    }
  }
});
