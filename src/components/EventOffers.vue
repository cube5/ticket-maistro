<template>
  <div>
    <v-errors :errors="errors"></v-errors>
    <div class="event-offers-item" v-for="price in prices">
      <v-event-offers-item
        :price="price"
        :area="getArea(price.relationships.areas.data[0].id)"
        :offer="getOffer(price.relationships.offers.data[0].id)"
      ></v-event-offers-item>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IEvent from "@/interfaces/Event";
import IEventOffers from "@/interfaces/EventOffers";
import VDivider from "@/components/Divider.vue";
import VErrors from "@/components/Errors.vue";
import VContainer from "@/components/Container.vue";
import VEventOffersItem from "@/components/EventOffersItem.vue";

@Component({ components: { VErrors, VDivider, VContainer, VEventOffersItem } })
export default class EventDetail extends Vue {
  @Prop() public eventOffers!: IEventOffers;

  public errors: any[] = [];

  get prices() {
    return this.getData().prices;
  }

  public getData() {
    try {
      const { offers, prices, _embedded: { areas } } = this.eventOffers;
      return {
        offers,
        prices: prices.data,
        areas: areas.data
      };
    } catch (err) {
      return {
        prices: [],
        areas: [],
        offers: []
      };
    } finally {
      this.errors = this.eventOffers.errors!.map((error: any) => ({
        name: error.status,
        message: error.detail
      }));
    }
  }

  public getOffer(id: string) {
    return this.getData().offers.find((offer: any) => id === offer.id);
  }

  public getArea(id: string) {
    return this.getData().areas.find((area: any) => id === area.id);
  }
}
</script>

<style lang="scss" scoped>
.event-offers {
}
</style>


