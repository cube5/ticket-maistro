<template>
  <div class="event-grid">
    <v-event-grid-item :key="event.id" v-for="event in events" :event="event"></v-event-grid-item>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IEvent from "@/interfaces/Event";
import VEventGridItem from "@/components/EventGridItem.vue";

@Component({
  components: { VEventGridItem }
})
export default class EventGrid extends Vue {
  @Prop() public events!: IEvent[];
}
</script>

<style lang="scss" scoped>
.event-grid {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;

  @include for-tablet-portrait-up {
    grid-template-columns: repeat(2, 1fr);
  }

  @include for-big-desktop-up {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

