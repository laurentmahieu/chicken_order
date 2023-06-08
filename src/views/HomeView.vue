<template>
  <v-toolbar color="white" elevation="3">
    <v-btn
      icon="mdi-arrow-left"
      :disabled="onboarding === 0"
      :color="onboarding === 0 ? 'white' : 'indigo'"
      @click="onboarding -= 1"
    />
    <v-spacer />

    <v-toolbar-items>
      <v-img
        src="/android-chrome-384x384.png"
        alt="alt"
        width="75px"
        class="my-2"
      />
    </v-toolbar-items>

    <v-spacer />
    <v-btn icon="mdi-basket-outline" color="indigo">
      <v-badge
        v-if="basket.length"
        :content="numberArticle"
        location="bottom end"
        text-color="indigo"
        color="white"
        bordered
      >
        <v-icon> mdi-basket-outline</v-icon>
      </v-badge>
    </v-btn>
  </v-toolbar>

  <v-window v-model="onboarding">
    <v-window-item>
      <DateWindow @next="onboarding = 1" />
    </v-window-item>

    <v-window-item>
      <ArticlesWindow @goBasket="goBasket" @next="updateArticle" />
    </v-window-item>

    <v-window-item>
      <QuantityWindow :article="article" @next="updateArticle" />
    </v-window-item>
  </v-window>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import DateWindow from "@/components/window/DateWindow.vue";
import ArticlesWindow from "@/components/window/ArticlesWindow.vue";
import QuantityWindow from "@/components/window/QuantityWindow.vue";
import { useBasketStore } from "@/stores/basketStore";
import { mapState } from "pinia";

export default defineComponent({
  name: "HomeView",

  components: {
    DateWindow,
    ArticlesWindow,
    QuantityWindow,
  },

  data() {
    return {
      onboarding: 0,
      article: undefined as number | undefined,
    };
  },

  computed: {
    ...mapState(useBasketStore, ["basket"]),

    numberArticle() {
      let numberArticle = 0;
      this.basket.forEach((element) => {
        numberArticle =
          numberArticle + (element.quantity == 0.5 ? 1 : element.quantity);
      });
      return numberArticle;
    },
  },

  methods: {
    goBasket() {
      // this.onboarding += 1;
      alert("Panier en cour de production");
    },
    updateArticle(id: number | undefined) {
      this.article = id;
      if (!!id || id === 0) {
        ++this.onboarding;
      } else {
        this.onboarding = 1;
      }
    },
  },
});
</script>
