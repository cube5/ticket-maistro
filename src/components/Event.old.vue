<template>
  <div class="container" :style="{
    'background-image': backgroundImage
  }">
    <div class="badge left" v-for="priceRange in event.priceRanges">
      Desde {{ priceRange.min | currency }}
    </div>
    <div class="content">
      <div>
        <h1>{{ event.name }}</h1>
        <div class="event-date">{{ event.dates.start.localDate | eventDate | capitalize }}</div>
        <div class="event-time">{{ event.dates.start.localTime | eventTime }}</div>
      </div>
      <div class="event-actions">
        <router-link :to="`/events/${event.id}`">
          <v-button class="event-actions-buy">Comprar boletos</v-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import VButton from "@/components/Button.vue";

export interface IPriceRange {
  min: number;
  max: number;
  type: string;
  currency: string;
}

export interface IEvent {
  name: string;
  info: string;
  dates: any;
  images: any[];
  _links: any;
  pleaseNote?: string;
  priceRanges: IPriceRange[];
}

@Component({ components: { VButton } })
export default class VEvent extends Vue {
  @Prop() public event!: IEvent;

  get eventLink(): string {
    const { self } = this.event._links;
    return self.href;
  }

  get backgroundImage(): string {
    const { images } = this.event;
    const candidates = images.filter(image => !image.fallback);
    const orderedByWidthAsc = candidates.sort(
      (curr, next) => curr.width - next.width
    );
    const largerImage = orderedByWidthAsc[orderedByWidthAsc.length - 1];
    return `url('${largerImage.url}')`;
  }
}
</script>


<style lang="scss" scoped>
.container {
  background-image: none;
  background-size: cover;
  box-shadow: inset 0em -100vh 0em rgba(0, 0, 0, 0.6);
  display: grid;
  grid-template-columns: 1fr;

  .badge {
    color: $light;
    background-color: $secondary;
    border-radius: 0 100px 100px 0;
    font-weight: bold;
    margin: 10px 0;
    padding: 5px 30px 5px 10px;
    width: max-content;
  }

  .content {
    color: $light;
    display: grid;
    min-height: 360px;
    max-height: 360px;
    padding: 0px 20px;
    text-align: center;

    .event-date {
      font-size: 1.3em;
      font-weight: bold;
    }

    .event-time {
      font-size: 1.1em;
    }

    .event-actions {
      display: grid;
      align-items: end;

      .event-actions-buy {
        max-height: 60px;
        min-height: 60px;
      }
    }
  }
}
</style>
