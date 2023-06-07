<template>
  <v-toolbar color="white" elevation="3">
    <v-btn v-show="onboarding !== 0" icon="mdi-arrow-left" color="indigo" />
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-img
        src="/android-chrome-384x384.png"
        alt="alt"
        width="75px"
        class="my-2"
      />
    </v-toolbar-items>

    <v-spacer></v-spacer>
    <v-btn icon="mdi-basket-outline" color="indigo" />
  </v-toolbar>

  <v-window v-model="onboarding">
    <v-window-item>
      <DateWindow />
    </v-window-item>
  </v-window>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import DateWindow from "@/components/window/DateWindow.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    DateWindow,
  },

  data() {
    return {
      onboarding: 0,
    };
  },
});
</script>
