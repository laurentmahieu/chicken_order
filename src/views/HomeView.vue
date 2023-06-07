<template>
  <v-toolbar color="white" elevation="3">
    <v-btn icon="mdi-arrow-left" color="indigo" />
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

  <v-container>
    <v-card elevation="0">
      <v-card-text class="text-indigo mb-6">
        <p>Bonjour et bienvenue{{ name ? ` ${name}` : "" }},</p>
        <p>Vous souhaitez réservez ?</p>
        <p>Dites m'en plus :</p>

        <v-text-field
          v-model="name"
          label="Au nom de "
          clearable
          class="pa-3"
          density="compact"
          :rules="[rules.required]"
        />
        <p>Ce serait pour récupérer le :</p>
      </v-card-text>

      <v-row justify="space-around">
        <v-btn
          stacked
          :color="choosenday === 1 ? 'indigo' : 'white'"
          text="samedi"
          @click="setDay(1)"
          class="my-4"
          :class="choosenday !== 1 ? 'text-indigo' : 'text-white'"
          width="220"
        >
          <template v-slot:append>{{ getFormatDate(saturday) }}</template>
        </v-btn>

        <v-col cols="8">
          <v-btn
            stacked
            :color="choosenday === 2 ? 'indigo' : 'white'"
            text="dimanche"
            @click="setDay(2)"
            class="mb-4"
            :class="choosenday !== 2 ? 'text-indigo' : 'text-white'"
            width="220"
          >
            <template v-slot:append>{{ getFormatDate(sunday) }}</template>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",

  components: {},

  data() {
    return {
      choosenday: null as number | null,
      name: "",
      saturday: new Date(),
      sunday: new Date(),
      rules: {
        required: (value: string) =>
          !!value || "Comment te reconnaitre sans ton petit nom ?",
      },
    };
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
      if (this.choosenday) {
      } else {
        alert("choisissez un jour");
      }
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
    },
  },
});
</script>
