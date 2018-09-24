<template>
  <div class="errors">
    <div v-for="error in errors"><strong>Error:</strong> ({{ error.name }}) {{ error.message }}.</div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Errors extends Vue {
  @Prop() public errors!: any[];
}
</script>

<style>
.errors {
  color: darkred;
  background-color: lightpink;
  padding: 10px;
}
</style>

