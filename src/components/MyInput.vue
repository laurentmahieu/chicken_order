<template>
  <div class="myInput">
    <label for="name">{{ label }}</label>

    <input
      :type="type"
      :name="name"
      required
      v-model="value"
      :class="fieldOk ? 'borderRed' : ''"
      @blur="$emit('blurInput')"
    />
    <div class="requireMessage">
      <span v-if="fieldOk"> Ce champs est requis </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyInput",

  props: {
    label: String,
    name: String,
    required: Boolean,
    showRequireMessage: Boolean,
    type: { String, default: "number" },
    modelValue: String,
  },

  data() {
    return {
      // modelValue: "",
    };
  },

  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(newValue: string) {
        this.$emit("update:modelValue", newValue);
      },
    },
    fieldOk() {
      return this.required && this.showRequireMessage && !this.modelValue;
    },
  },
});
</script>

<style scoped>
label {
  color: aliceblue;
  background-color: black;
  margin-bottom: -4px;
  margin-left: 5px;
  padding: 0 4px;
  width: max-content;
  z-index: 2;
  font-size: small;
}
input {
  border: 1px solid aliceblue;
  border-radius: 5px;
  padding: 15px;
  background-color: black;
  color: aliceblue;
}
.borderRed {
  border: 1px solid #a83234;
}

input:focus {
  border: 1px solid orange;
}
.myInput {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4px;
}

.requireMessage {
  color: #a83234;
  font-size: smaller;
  height: 15px;
}
</style>
