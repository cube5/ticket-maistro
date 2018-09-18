<template>
  <div
    class="container"
    :style="{
      'background-image': backgroundImage
    }"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <div class="badges">
      <div class="badge" v-for="priceRange in event.priceRanges">
        From {{ priceRange.min | currency(priceRange.currency, event.locale) }}
      </div>
    </div>
    <div class="content">
      <div class="event-info">
        <div class="event-title" :title="event.name">{{ event.name }}</div>
        <div class="event-date">
          {{ event.dates.start.localDate | eventDate | capitalize }}
          <span class="divider"></span>
          {{ venue }}
          <span class="event-time">{{ event.dates.start.localTime | eventTime }}</span>
        </div>
      </div>
      <v-appearing-box
        class="event-tickets"
        :class="isVisible ? 'visible' : 'hidden'"
        :pose="isVisible ? 'visible' : 'hidden'"
      >
        <router-link :to="`/events/${event.id}`" class="unstyled-link">Buy tickets</router-link>
      </v-appearing-box>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import posed from "vue-pose";
import IEvent from "@/interfaces/Event";
import VButton from "@/components/Button.vue";

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

@Component({ components: { VButton, VAppearingBox } })
export default class VEvent extends Vue {
  @Prop() public event!: IEvent;
  public isVisible: boolean = false;

  get backgroundImage(): string {
    const { images } = this.event;
    const candidates = images.filter(
      image => image.ratio === "3_2" && !image.fallback
    );
    const orderedByWidthAsc = candidates.sort(
      (curr, next) => curr.width - next.width
    );
    const largerImage = orderedByWidthAsc[orderedByWidthAsc.length - 1];
    return `url('${largerImage.url}')`;
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
.container {
  background-image: none;
  background-size: cover;
  border-radius: 10px;
  box-shadow: inset 0em -20vh 30em rgba(0, 0, 0, 0.9);
  padding-top: 10px;
  display: grid;
  grid-template-rows: 1fr 8fr;

  .badges {
    color: $light;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    .badge {
      background-color: $secondary;
      border-radius: 0 100px 100px 0;
      font-weight: bold;
      padding: 5px 30px 5px 10px;
      width: fit-content;
    }
  }

  .divider {
    width: 1px;
    height: 100%;
    border: 0px solid rgba(255, 255, 255, 0.8);
    border-right-width: 1px;
    margin: 0px 9px 0px 5px;

    &::after {
      content: "";
    }
  }

  .content {
    color: $light;
    display: grid;
    grid-template-rows: 1fr;
    align-items: end;
    text-align: left;

    .event-info {
      display: grid;
      padding: 15px;

      .event-title {
        font-size: 1.5em;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .event-date {
        font-size: 1.2em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .event-time {
        font-size: 0.8em;
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
}
</style>