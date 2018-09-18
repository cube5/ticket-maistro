<template>
  <pre>{{JSON.stringify(event, null, 2)}}</pre>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IEvent from "@/interfaces/Event";

@Component
export default class EventDetail extends Vue {
  @Prop() public event!: IEvent;
}
</script>

