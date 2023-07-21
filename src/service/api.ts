import Trans from "@/i18n/translation";
import { router } from "@/router";
import axios, { type CreateAxiosDefaults } from "axios";
import { useRouter } from "vue-router";

export const BASE_URL = "https://api.zamon.uz/";

const ApiConfig: CreateAxiosDefaults = {
  baseURL: `${BASE_URL}api/v3/`
};

export const fetchData = axios.create(ApiConfig);

fetchData.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 404) {
      //   router.push({ name: "404" });
      router.push({ name: "NotFound" });
    }
    return Promise.reject(err);
  }
);

export const api = {
  fetchNews: () => fetchData(`${Trans.currentLocale}/news/list`).then((res) => res.data)
};
