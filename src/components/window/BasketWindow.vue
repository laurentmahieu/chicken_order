<template>
  <v-container>
    <v-card elevation="0">
      <v-card-text class="text-indigo mb-6">
        <p>On récapitule {{ basketName }} ?</p>
        <p>
          Le {{ basketDate ? formaterDate(basketDate) : "error" }}, tu souhaites
          venir récupérer :
        </p>

        <v-table class="my-10">
          <tbody>
            <tr v-for="(item, i) in basket" :key="item.name">
              <td>
                <p class="font-weight-medium">{{ item.name }}</p>
                <span v-if="item.name.includes('Poulet')" class="font-italic">
                  {{ item.sauce ? "avec sauce" : "sans sauce" }}
                </span>
              </td>
              <td>
                {{ item.quantity }}
              </td>

              <td class="text-end">
                <v-btn
                  icon="mdi-trash-can-outline"
                  variant="text"
                  @click="handleDelete(i)"
                />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>

      <v-card-actions>
        <v-row justify="space-around" align="center">
          <v-btn
            :disabled="!basket.length"
            stacked
            color="indigo"
            text="Valider"
            class="ma-4"
            width="300"
            variant="elevated"
            :loading="loading"
            @click="handleSave"
          />
          <v-btn
            stacked
            color="white"
            text="annuler"
            class="ma-4 text-indigo"
            width="300"
            variant="elevated"
            @click="handleCancel"
          />
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { mapState, mapWritableState } from "pinia";
import { useBasketStore } from "@/stores/basketStore";

export default defineComponent({
  name: "BasketWindow",

  data() {
    return {
      weekDays: [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
      ],
      months: [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ],
      loading: false,
    };
  },

  computed: {
    ...mapState(useBasketStore, ["basketName"]),
    ...mapWritableState(useBasketStore, ["basket", "basketDate"]),
  },

  methods: {
    formaterDate(d: Date) {
      const jourSemaine = this.weekDays[d.getDay()];
      const jour = d.getDate();
      const moisActuel = this.months[d.getMonth()];

      return `${jourSemaine} ${jour} ${moisActuel}`;
    },

    handleDelete(index: number) {
      this.basket.splice(index, 1);
    },

    handleSave() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        alert("en cours de développement");
      }, 2000);
    },

    handleCancel() {
      this.$emit("goHome");
      this.basket = [];
      this.basketDate = undefined;
    },
  },
});
</script>
