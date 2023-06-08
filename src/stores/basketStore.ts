import { defineStore } from "pinia";

type Article = {
  name: string;
  subtitle: string;
  price: string;
  quantity: number;
  sauce: boolean;
};

export const useBasketStore = defineStore("basketStore", {
  state: () => ({
    basket: [] as Article[],
    basketName: "",
    basketDate: undefined as Date | undefined,
  }),

  actions: {
    addToBasket(newArticle: Article) {
      this.basket.push(newArticle);
    },
  },
});
