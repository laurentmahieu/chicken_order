<template>
  <v-container>
    <v-card elevation="0">
      <v-card-text class="text-indigo mb-6">
        <p>Bonjour et bienvenue{{ name ? ` ${name}` : "" }},</p>
        <p>Vous souhaitez réservez ?</p>
        <p>Dites m'en plus :</p>

        <v-form ref="form" validate-on="blur">
          <v-text-field
            v-model="nameUppercase"
            label="Au nom de "
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
          "Comment te reconnaitre sans ton petit nom ?",
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
        this.name = newValue?.trim()?.toLocaleUpperCase() ?? "";
      },
    },
  },

  mounted() {
    this.name = localStorage.getItem("username") ?? "";
    this.sunday = this.getMonday(new Date(), 0);
    this.saturday = this.getMonday(new Date(), 7);
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

    getMonday(d: Date, dayIndex: number) {
      d = new Date(d);

      const day = d.getDay();
      const diffToto = dayIndex - day + (dayIndex == 0 ? 7 : -1);
      const diff = d.getDate() + diffToto;

      return new Date(d.setDate(diff));
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
      const { valid } = await this.$refs.form.validate();

      if (valid && this.choosenday) this.handleSave();
    },
  },
});
</script>