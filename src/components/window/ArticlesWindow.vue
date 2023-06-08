<template>
  <v-container>
    <v-card elevation="0">
      <v-card-text class="text-indigo mb-6">
        <p>Que souhaitez vous ajouter ?</p>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col align="center">
            <v-row align="center" justify="space-around">
              <v-btn
                v-for="(article, i) in ARTICLES"
                stacked
                color="white"
                class="ma-4 text-indigo"
                width="300"
                variant="elevated"
                @click="$emit('next', i)"
              >
                <template v-slot:prepend>
                  <span class="text-h6">{{ article.name }}</span>
                </template>
                <span class="text-caption text-disabled">
                  {{ article.subtitle }}
                </span>
              </v-btn>
            </v-row>

            <v-row justify="center">
              <v-btn
                v-if="basket.length"
                stacked
                color="indigo"
                text="Déjà fini ?"
                class="ma-4"
                width="300"
                variant="elevated"
                @click="$emit('goBasket')"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Const
import ARTICLES from "@/const/articles";

// Store
import { mapState } from "pinia";
import { useBasketStore } from "@/stores/basketStore";

export default defineComponent({
  name: "ArticlesWindow",

  data() {
    return {
      ARTICLES,
    };
  },

  computed: {
    ...mapState(useBasketStore, ["basket"]),
  },
});
</script>
