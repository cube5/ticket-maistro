<template>
  <button class="button" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",

  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: $primary;
  color: $light;
  cursor: pointer;
  font-size: 14pt;
  padding: 3px 10px;
  margin: 10px;
}
</style>
