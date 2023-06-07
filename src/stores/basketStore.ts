import { defineStore } from "pinia";

export const useBasketStore = defineStore("basketStore", {
  state: () => ({
    basket: [],
    basketName: "",
    basketDate: undefined as Date | undefined,
  }),

  actions: {
    addToBasket() {
      //
    },
  },
});
