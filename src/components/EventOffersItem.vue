<template>
  <div class="event-offers-item">
    <div>
      <div>{{ area.attributes.description }}</div>
      <div><small>{{ offer.attributes.description }}</small></div>
    </div>
    <div>
      <b>{{ +price.attributes.value | currency(price.attributes.currency) }}</b>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IEvent from "@/interfaces/Event";
import VContainer from "@/components/Container.vue";
import { IPrice, IArea, IOffer } from "@/interfaces/EventOffers";

@Component({ components: { VContainer } })
export default class EventDetail extends Vue {
  @Prop() public price!: IPrice;
  @Prop() public area!: IArea;
  @Prop() public offer!: IOffer;
}
</script>

<style lang="scss" scoped>
.event-offers-item {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
}
</style>


