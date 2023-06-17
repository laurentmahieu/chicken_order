<template>
  <v-container>
    <v-card elevation="0">
      <v-card-text class="text-indigo mb-6">
        <p>Bonjour et bienvenue{{ name ? ` ${name}` : "" }},</p>
        <p>Vous souhaitez réserver ?</p>
        <p>Dites-m'en plus :</p>

        <v-form ref="form" validate-on="blur">
          <v-text-field
            v-model="nameUppercase"
            label="Au nom de"
            clearable
            class="pa-3"
            density="compact"
            :rules="[rules.required]"
            autofocus
          />
        </v-form>
        <p>Ce serait pour récupérer le :</p>
      </v-card-text>

      <v-row justify="space-around">
        <v-btn
          v-if="saturday < sunday"
          stacked
          :color="choosenday === 1 ? 'indigo' : 'white'"
          text="samedi"
          @click="setDay(1)"
          class="ma-4"
          :class="choosenday !== 1 ? 'text-indigo' : 'text-white'"
          width="220"
        >
          <template v-slot:append>{{ getFormatDate(saturday) }}</template>
        </v-btn>

        <v-btn
          stacked
          :color="choosenday === 2 ? 'indigo' : 'white'"
          text="dimanche"
          @click="setDay(2)"
          class="ma-4"
          :class="choosenday !== 2 ? 'text-indigo' : 'text-white'"
          width="220"
        >
          <template v-slot:append>{{ getFormatDate(sunday) }}</template>
        </v-btn>

        <v-btn
          v-if="saturday > sunday"
          stacked
          :color="choosenday === 1 ? 'indigo' : 'white'"
          text="samedi"
          @click="setDay(1)"
          class="ma-4"
          :class="choosenday !== 1 ? 'text-indigo' : 'text-white'"
          width="220"
        >
          <template v-slot:append>{{ getFormatDate(saturday) }}</template>
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useBasketStore } from "@/stores/basketStore";
import { mapWritableState } from "pinia";

export default defineComponent({
  name: "DateWindow",

  data() {
    return {
      choosenday: null as number | null,
      name: "",
      saturday: new Date(),
      sunday: new Date(),
      rules: {
        required: (value: string) =>
          (!!value && !!value.trim()) ||
          "Comment te reconnaître sans ton petit nom ?",
      },
    };
  },

  computed: {
    ...mapWritableState(useBasketStore, ["basketName", "basketDate"]),

    nameUppercase: {
      get() {
        return this.name;
      },
      set(newValue: string | null) {
        this.name = (newValue?.trim() ?? "").toLocaleUpperCase();
      },
    },
  },

  watch: {
    basketDate(newValue) {
      if (!newValue) {
        this.choosenday = null;
      }
    },
  },

  mounted() {
    this.name = localStorage.getItem("username") ?? "";
    this.getNextWeekSatNSun();
  },

  methods: {
    clearForm() {
      this.choosenday = null;
      this.name = localStorage.getItem("username") ?? "";
    },

    handleSave() {
      this.basketName = this.name;
      this.basketDate = this.choosenday === 1 ? this.saturday : this.sunday;
      localStorage.setItem("username", this.name);
      this.$emit("next");
    },

    getNextWeekSatNSun() {
      const today = new Date();
      const jourActuel = today.getDay(); // Récupère le jour de la semaine actuel (0 = dimanche, 1 = lundi, ..., 6 = samedi)
      const joursRestants = 6 - jourActuel; // Calcule le nombre de jours restants jusqu'à samedi (6 = samedi)

      // Ajoute les jours restants à la date actuelle pour obtenir la date de samedi prochain
      const nextSaturday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + joursRestants
      );

      // Ajoute 1 jour à la date de samedi pour obtenir la date de dimanche prochain
      const nextSunday = new Date(
        nextSaturday.getFullYear(),
        nextSaturday.getMonth(),
        nextSaturday.getDate() + 1
      );

      this.sunday = nextSunday;
      this.saturday = joursRestants
        ? nextSaturday
        : new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    },

    getFormatDate(d: Date) {
      const today = new Date(d);
      const yyyy = today.getFullYear();
      let mNumber = today.getMonth() + 1; // Months start at 0!
      let dNumber = today.getDate();
      let dd = dNumber.toString();
      let mm = mNumber.toString();

      if (dNumber < 10) {
        dd = "0" + dd;
      }
      if (mNumber < 10) {
        mm = "0" + mm;
      }

      return dd + "/" + mm + "/" + yyyy;
    },

    setDay(id: number) {
      this.choosenday = id;
      this.validate();
    },

    async validate() {
      const { valid } = await Object(this.$refs.form).validate();

      if (valid && this.choosenday) this.handleSave();
    },
  },
});
</script>
