import Trans from "@/i18n/translation";
import { useLoadingStore } from "@/stores/loading";
import axios, { type CreateAxiosDefaults } from "axios";

export const BASE_URL = "https://api.zamon.uz/";

const ApiConfig: CreateAxiosDefaults = {
  baseURL: `${BASE_URL}api/v3/`
};

export const fetchData = axios.create(ApiConfig);

fetchData.interceptors.response.use(
  (res) => {
    const loading = useLoadingStore();
    loading.setStatus("success");
    return res;
  },
  (err) => {
    const loading = useLoadingStore();
    loading.setStatus("error");
    if (err.response.status === 404) {
      loading.setStatus(404);
      // return Trans.i18nRoute({ name: "NotFound" });
    }
    return Promise.reject(err);
  }
);

fetchData.interceptors.request.use(
  (config) => {
    const loading = useLoadingStore();
    loading.setStatus("loading");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  fetchNews: ({ limit, offset }: { limit: number; offset: number }) =>
    fetchData(`${Trans.currentLocale}/news/list?limit=${limit}&offset=${offset * limit}`).then(
      (res) => res.data
    ),
  fetchDetailNews: ({ slug }: { slug: string }) =>
    fetchData(`${Trans.currentLocale}/news/${slug}/`).then((res) => res.data)
};
