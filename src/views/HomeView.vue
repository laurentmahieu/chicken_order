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
    <v-btn icon="mdi-basket-outline" color="indigo" />
  </v-toolbar>

  <v-window v-model="onboarding">
    <v-window-item>
      <DateWindow @next="onboarding = 1" />
    </v-window-item>

    <v-window-item>
      <ArticlesWindow @goBasket="goBasket" @next="updateArticle" />
    </v-window-item>

    <v-window-item> quantity </v-window-item>
  </v-window>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import DateWindow from "@/components/window/DateWindow.vue";
import ArticlesWindow from "@/components/window/ArticlesWindow.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    DateWindow,
    ArticlesWindow,
  },

  data() {
    return {
      onboarding: 0,
      article: null as number | null,
    };
  },

  methods: {
    goBasket() {
      // this.onboarding += 1;
    },
    updateArticle(id: number | null) {
      this.article = id;
      if (!!id) {
        this.onboarding += 1;
      } else {
        //
      }
    },
  },
});
</script>
