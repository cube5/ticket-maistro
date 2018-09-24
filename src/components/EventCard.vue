<template>
  <div
    class="event-card"
    :style="{ 'background-image': backgroundImage }"
  >
    <slot></slot>
    <div class="event-card-content">
      <div class="event-info">
        <div class="event-title" :title="event.name">{{ event.name }}</div>
        <div class="event-date">
          {{ event.dates.start.localDate | eventDate | capitalize }}
          <span class="divider"></span>
          {{ venue }}
          <span class="event-time">@ {{ event.dates.start.localTime | eventTime }}</span>
        </div>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IEvent from "@/interfaces/Event";

@Component
export default class EventCard extends Vue {
  @Prop() public event!: IEvent;

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
}
</script>

<style lang="scss" scoped>
.event-card {
  background-image: none;
  background-size: cover;
  border-radius: 10px;
  box-shadow: inset 0em -5rem 20rem rgba(0, 0, 0, 0.9);

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

  .event-card-content {
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
  }
}
</style>

