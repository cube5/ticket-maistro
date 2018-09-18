<template>
  <div class="divider" :class="type"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class VDivider extends Vue {
  @Prop({ default: "horizontal" })
  public type!: "horizontal" | "vertical";
}
</script>


<style lang="scss" scoped>
.divider {
  background: $alternative;

  &.horizontal {
    margin: 10px 0px;
    width: 100%;
    height: 1px;
  }

  &.vertical {
    margin: 0px 10px;
    width: 1px;
    height: 100%;
  }
}
</style>

