<script setup lang="ts"></script>

<template>
  <div id="homeHeader">
    <img src="/android-chrome-384x384.png" alt="alt" id="homeHeaderImg" />
  </div>
  <div class="container">
    <p>Bonjour et bienvenue,</p>
    <p>Vous souhaitez réservez pour :</p>

    <div id="daychoice">
      <div id="daychoiceBtns">
        <button
          @click="choosenday = 1"
          :class="choosenday === 1 ? 'isSelected' : ''"
        >
          Samedi
        </button>
        <button
          @click="choosenday = 2"
          :class="choosenday === 2 ? 'isSelected' : ''"
        >
          dimanche
        </button>
      </div>
    </div>
    <MyInput label="Au nom de " type="text" />
    <MyInput label="nombre de poulet de Lick" />
    <MyInput label="nombre de poulet 1,4 kg" />
    <MyInput label="nombre de poulet 1,2 kg" />
    <MyInput label="nombre de barquette de pomme de terre" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyInput from "@/components/MyInput.vue";

export default defineComponent({
  name: "HomeView",

  components: { MyInput },

  data() {
    return {
      choosenday: null as number | null,
    };
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
}
#daychoice,
#daychoiceBtns {
  width: 100%;
  display: flex;
  justify-content: center;
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
