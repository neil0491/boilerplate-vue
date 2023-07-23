import { defineStore } from "pinia";

interface ILoading {
  status: LoadingType;
}

export const useLoadingStore = defineStore("loading", {
  state: (): ILoading => ({
    status: "init"
  }),
  getters: {
    getStatus: (state) => state.status
  },
  actions: {
    setStatus(val: LoadingType) {
      this.status = val;
    }
  }
});
