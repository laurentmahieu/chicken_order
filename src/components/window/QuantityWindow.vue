<template>
  <v-container>
    <v-card elevation="0">
      <v-card-text class="text-indigo mb-6">
        <p>Combien en souhaitez vous ?</p>
      </v-card-text>

      <v-card-actions class="mb-6">
        <v-row>
          <v-col>
            <v-row>
              <v-col align="center" v-for="quantity in quantities" cols="6">
                <v-btn
                  :text="`${quantity}`"
                  :class="
                    quantityValue == quantity ? 'text-white' : 'text-indigo'
                  "
                  :color="quantityValue == quantity ? 'indigo' : 'white'"
                  variant="elevated"
                  height="100"
                  width="100"
                  @click="saveQuantity(quantity)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-actions>

      <v-card-text class="text-indigo" v-show="article !== 3">
        <v-switch label="De la sauce ?" v-model="withSauce" class="mx-4" />
      </v-card-text>

      <v-card-actions v-show="article !== 3">
        <v-btn
          stacked
          color="indigo"
          text="Confirmer"
          class="ma-4"
          width="300"
          variant="elevated"
          :disabled="!quantityValue"
          @click="confirmQuantity"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Const
import ARTICLES from "@/const/articles";
import { mapActions, mapWritableState } from "pinia";
import { useBasketStore } from "@/stores/basketStore";

export default defineComponent({
  name: "QuantityWindow",

  props: {
    article: Number,
  },

  data() {
    return {
      quantities: [1, 2, 3, 4, 5, 0.5],
      withSauce: true,
      quantityValue: undefined as number | undefined,
    };
  },

  methods: {
    ...mapActions(useBasketStore, ["addToBasket"]),

    saveQuantity(value: number) {
      this.quantityValue = value;
      if (this.article === 3) {
        this.confirmQuantity();
      }
    },

    confirmQuantity() {
      try {
        if ((this.article || this.article == 0) && this.quantityValue) {
          const newArticle = ARTICLES[this.article];
          newArticle.quantity = this.quantityValue;
          newArticle.sauce = this.article === 3 ? false : this.withSauce;

          this.addToBasket(newArticle);
          this.$emit("next");
          this.quantityValue = undefined;
        } else {
          alert("Erreur: On a oublié de quel article il s'agisait");
        }
      } catch (error) {
        alert(error);
      }
    },
  },
});
</script>
