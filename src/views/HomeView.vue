<template>
  <div id="homeHeader">
    <img src="/android-chrome-384x384.png" alt="alt" id="homeHeaderImg" />
  </div>
  <div class="container">
    <p>Bonjour et bienvenue{{ ` ${name}` }},</p>
    <p>Vous souhaitez réservez pour :</p>

    <div id="daychoice">
      <div id="daychoiceBtns">
        <MyButton
          msg="Samedi"
          @click="choosenday = 1"
          :bgColor="choosenday === 1 ? 'orange' : 'aliceblue'"
          :color="choosenday === 1 ? 'aliceblue' : 'orange'"
        />

        <MyButton
          msg="dimanche"
          @click="choosenday = 2"
          :bgColor="choosenday === 2 ? 'orange' : 'aliceblue'"
          :color="choosenday === 2 ? 'aliceblue' : 'orange'"
        />
      </div>
    </div>
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
        color="orange"
      />
      <MyButton
        msg="Envoyer"
        @click="handleSave"
        bgColor="orange"
        color="aliceblue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyInput from "@/components/MyInput.vue";
import MyButton from "@/components/MyButton.vue";

export default defineComponent({
  name: "HomeView",

  components: { MyInput, MyButton },

  data() {
    return {
      choosenday: null as number | null,
      name: "",
      showRequireMessage: false,
      lickChicken: "",
      chicken: "",
      smallChicken: "",
      patate: "",
    };
  },

  mounted() {
    this.name = localStorage.getItem("username") ?? "";
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
  max-width: 300px;
  margin: auto;
  color: orange;
}
#daychoice,
#daychoiceBtns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  width: 120px;
  margin: 10px;
  padding: 10px;
  text-transform: uppercase;
  border: none;
  border-radius: 10px;
  border: 1px solid orange;
  color: orange;
}
button:hover {
  cursor: pointer;
}
.isSelected {
  background-color: orange;
  border: 1px solid aliceblue;
  color: white;
}
</style>
