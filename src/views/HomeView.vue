<template>
  <div id="homeHeader">
    <img src="/android-chrome-384x384.png" alt="alt" id="homeHeaderImg" />
  </div>
  <div class="container">
    <p>Bonjour et bienvenue{{ name ? ` ${name}` : "" }},</p>
    <p>Vous souhaitez réservez pour :</p>

    <div id="daychoice">
      <MyButtonDay
        day="samedi"
        :msg="getFormatDate(saturday)"
        @click="choosenday = 1"
        :bgColor="choosenday === 1 ? 'navy' : 'white'"
        :color="choosenday === 1 ? 'white' : 'navy'"
      />

      <MyButtonDay
        day="dimanche"
        :msg="getFormatDate(sunday)"
        @click="choosenday = 2"
        :bgColor="choosenday === 2 ? 'navy' : 'white'"
        :color="choosenday === 2 ? 'white' : 'navy'"
      />
    </div>

    <!--     
    <MyInput
      label="Nom *"
      type="text"
      name="name"
      required
      :showRequireMessage="showRequireMessage"
      v-model="name"
      @blurInput="showRequireMessage = true"
    />

    <MyInput label="Nombre de poulet de Lick" v-model="lickChicken" />
    <MyInput label="Nombre de poulet 1,4 kg" v-model="chicken" />
    <MyInput label="Nombre de poulet 1,2 kg" v-model="smallChicken" />
    <MyInput label="Nombre de barquette de pomme de terre" v-model="patate" />

    <div style="display: flex; justify-content: space-between">
      <MyButton
        msg="Annuler"
        @click="clearForm"
        bgColor="aliceblue"
        color="navy"
      />
      <MyButton
        msg="Envoyer"
        @click="handleSave"
        bgColor="navy"
        color="aliceblue"
      />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MyInput from "@/components/MyInput.vue";
import MyButtonDay from "@/components/MyButtonDay.vue";
// import MyButton from "@/components/MyButton.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    MyInput,
    // MyButton,
    MyButtonDay,
  },

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

<style scoped>
#homeHeader {
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#homeHeaderImg {
  height: 90%;
}
p {
  padding-left: 10px;
}
.container {
  padding: 50px;
  max-width: 300px;
  margin: auto;
  color: navy;
}
#daychoice {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 37px;
}
button {
  width: 120px;
  margin: 10px;
  padding: 10px;
  text-transform: uppercase;
  border: none;
  border-radius: 10px;
  border: 1px solid navy;
  color: navy;
}
button:hover {
  cursor: pointer;
}
.isSelected {
  background-color: navy;
  border: 1px solid aliceblue;
  color: white;
}
</style>
