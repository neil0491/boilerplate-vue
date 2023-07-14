import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    count: (state) => state.counter
  },
  actions: {
    increment() {
      this.counter++;
    }
  }
});
