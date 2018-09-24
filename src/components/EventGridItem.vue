<template>
  <v-event-card
    class="event-grid-item"
    :event="event"
    @mouseover.native="handleMouseOver"
    @mouseleave.native="handleMouseLeave"
  >
    <div class="badges">
      <div v-if="priceRange" class="badge">
        {{ $t("From") }} {{ priceRange.min | currency(priceRange.currency, event.locale) }}
      </div>
      <div v-else class="badge">
        {{ $t("On Sale") }}: {{ publicSaleDate }}
      </div>
    </div>
    <template slot="footer">
      <v-appearing-box
        class="event-tickets"
        :class="isVisible ? 'visible' : 'hidden'"
        :pose="isVisible ? 'visible' : 'hidden'"
      >
        <router-link :to="`/events/${event.id}`" class="unstyled-link">{{ $t("Buy tickets") }}</router-link>
      </v-appearing-box>
    </template>
  </v-event-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import posed from "vue-pose";
import moment from "moment";
import IEvent, { IPriceRange } from "@/interfaces/Event";
import VButton from "@/components/Button.vue";
import VEventCard from "@/components/EventCard.vue";

const VAppearingBox = posed.div({
  visible: {
    height: "100%",
    transition: { duration: 200 }
  },
  hidden: {
    height: 0,
    transition: { duration: 200 }
  }
});

@Component({ components: { VButton, VEventCard, VAppearingBox } })
export default class VEvent extends Vue {
  @Prop() public event!: IEvent;
  public isVisible: boolean = false;

  get priceRange(): IPriceRange | null {
    const { priceRanges } = this.event;
    if (priceRanges && priceRanges.length !== 0) {
      return priceRanges[0];
    }

    return null;
  }

  get publicSaleDate(): string {
    const { sales } = this.event;
    const { startDateTime, startTBD } = sales.public;
    return startTBD
      ? this.$t("Soon").toString()
      : moment(startDateTime, "YYYY-MM-DDThh:mm:ssZ").format("MMM DD");
  }

  get venue(): string {
    const { _embedded } = this.event;
    const venue = _embedded.venues[0];
    return venue.name;
  }

  public handleMouseOver() {
    this.isVisible = true;
  }

  public handleMouseLeave() {
    this.isVisible = false;
  }
}
</script>

<style lang="scss" scoped>
.event-grid-item {
  padding-top: 10px;
  display: grid;
  grid-template-rows: 1fr 8fr;

  .badges {
    color: $light;
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;

    .badge {
      background-color: $secondary;
      border-radius: 0 100px 100px 0;
      font-weight: bold;
      padding: 5px 30px 5px 10px;
      width: fit-content;
    }
  }

  .event-tickets {
    color: $light;
    font-size: 1.5em;
    font-weight: bold;
    line-height: 2em;
    text-align: center;
    background-color: $primary;

    &.hidden {
      visibility: hidden;
    }
    &.visible {
      visibility: initial;
    }

    .unstyled-link {
      color: $light;
      text-decoration: none;
    }
  }
}
</style>