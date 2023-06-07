<template>
  <v-row>
    <v-col align="center">
      <v-img
        src="/android-chrome-384x384.png"
        alt="alt"
        width="75px"
        class="mt-6"
      />
    </v-col>
  </v-row>

  <v-container>
    <v-card elevation="0">
      <v-card-text class="text-indigo mb-6">
        <p>Bonjour et bienvenue{{ name ? ` ${name}` : "" }},</p>
        <p>Vous souhaitez réservez pour :</p>
      </v-card-text>

      <v-row justify="space-around">
        <v-col cols="8">
          <v-btn
            block
            :color="choosenday === 1 ? 'indigo' : 'white'"
            :text="`samedi - ${getFormatDate(saturday)}`"
            @click="choosenday = 1"
            class="mb-4"
          />
        </v-col>

        <v-col cols="8">
          <v-btn
            block
            :color="choosenday === 2 ? 'indigo' : 'white'"
            :text="`dimanche - ${getFormatDate(sunday)}`"
            @click="choosenday = 2"
            class="mb-4"
          />
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
      showRequireMessage: false,
      lickChicken: "",
      chicken: "",
      smallChicken: "",
      patate: "",
      saturday: new Date(),
      sunday: new Date(),
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
      this.name = "";
      this.showRequireMessage = false;
      this.lickChicken = "";
      this.chicken = "";
      this.smallChicken = "";
      this.patate = "";
    },

    handleSave() {
      if (this.choosenday) {
        if (this.name?.trim()) {
          if (
            this.lickChicken ||
            this.chicken ||
            this.smallChicken ||
            this.patate
          ) {
            //
            alert("Merci, à très vite");
            localStorage.setItem("username", this.name);
            this.$router.push("/");
          } else {
            alert(
              "Veuillez au moins indiquer une quantité positive pour un article "
            );
          }
        } else {
          this.showRequireMessage = true;
          alert("saisissez un nom");
        }
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
      const today = new Date();
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
  },
});
</script>

<style scoped></style>
