<template>
  <div>
    <v-event-card class="event-detail-banner" :event="event"></v-event-card>
    <v-container class="event-detail">
      <div>
        <img title="seatmap" width="100%" :src="seatmap" />
      </div>
      <v-paper class="paper">
        <v-event-offers :eventOffers="eventOffers"></v-event-offers>
      </v-paper>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IEvent from "@/interfaces/Event";
import VContainer from "@/components/Container.vue";
import VPaper from "@/components/Paper.vue";
import VEventCard from "@/components/EventCard.vue";
import VEventGridItem from "@/components/EventGridItem.vue";
import VEventOffers from "@/components/EventOffers.vue";

@Component({
  components: {
    VContainer,
    VPaper,
    VEventCard,
    VEventGridItem,
    VEventOffers
  }
})
export default class EventDetail extends Vue {
  @Prop() public event!: IEvent;
  @Prop() public eventOffers!: any;

  get seatmap(): string {
    if (this.event) {
      const { seatmap } = this.event;
      return seatmap.staticUrl;
    }
    return "";
  }
}
</script>

<style lang="scss" scoped>
.event-detail-banner {
  color: $light;
  display: grid;
  height: 300px;
}

.event-detail {
  display: grid;
  grid-template-columns: 2fr 1fr;

  .paper {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
    transform: translateY(-100px);

    @include for-phone-only {
      transform: none;
    }

    .presales {
      margin: 0;
      padding-left: 10px;
      list-style: none;
    }
  }
}
</style>

