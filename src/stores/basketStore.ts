import { defineStore } from "pinia";

export const useBasketStore = defineStore("basketStore", {
  state: () => ({
    basket: [],
  }),
  actions: {
    addToBasket() {
      //
    },
  },
});
