<template>
  <div class="paper">
    <v-container>
      <slot></slot>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VContainer from "@/components/Container.vue";

@Component({ components: { VContainer } })
export default class Paper extends Vue {}
</script>

<style lang="scss" scoped>
.paper {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 10px;
}
</style>

