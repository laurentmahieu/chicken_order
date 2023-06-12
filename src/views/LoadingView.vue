<template>
  <div id="loadingView">
    <img src="/android-chrome-384x384.png" alt="alt" id="loadingViewImg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingView",

  mounted() {
    setTimeout(this.closeLoader, 3000);
  },

  methods: {
    closeLoader() {
      this.$router.push("/home");
    },
  },
});
</script>

<style scoped>
@keyframes rotation {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(359deg);
  }
}

#loadingView {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#loadingViewImg {
  width: 200px;
  height: 200px;
  animation: rotation 3s infinite linear;
}
</style>
