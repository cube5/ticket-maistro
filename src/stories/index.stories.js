/* eslint-disable import/no-extraneous-dependencies */
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import StoryRouter from "storybook-vue-router";

import "@/filters";
import { getters, actions, mutations } from "@/store";
import i18n from "@/i18n";
import VButton from "@/components/Button.vue";
import VContainer from "@/components/Container.vue";
import VHeader from "@/components/Header.vue";
import VFooter from "@/components/Footer.vue";
import VEventCard from "@/components/EventCard.vue";
import VEventGrid from "@/components/EventGrid.vue";
import VEventGridItem from "@/components/EventGridItem.vue";
import VEventDetail from "@/components/EventDetail.vue";
import VEventOffers from "@/components/EventOffers.vue";
import eventsMock from "../../tests/mocks/events";
import eventOffersMock from "../../tests/mocks/offers";
import "@/styles/base.scss";

storiesOf("Button", module)
  .add("with text", () => ({
    components: { VButton },
    template: '<v-button @click="action">Hello Button</v-button>',
    methods: { action: action("clicked") }
  }))
  .add("with JSX", () => ({
    components: { VButton },
    render() {
      return <v-button onClick={this.action}>With JSX</v-button>;
    },
    methods: { action: linkTo("Button", "with some emoji") }
  }))
  .add("with some emoji", () => ({
    components: { VButton },
    template: '<v-button @click="action">😀 😎 👍 💯</v-button>',
    methods: { action: action("clicked") }
  }));

storiesOf("Header", module)
  .addDecorator(StoryRouter())
  .add("Header", () => ({
    components: { VHeader },
    store: new Vuex.Store({
      state: { country: "us" },
      getters,
      actions,
      mutations
    }),
    template: `<v-header></v-header>`
  }))
  .add("with i18n", () => ({
    components: { VHeader },
    store: new Vuex.Store({
      state: { country: "us" },
      getters,
      actions,
      mutations
    }),
    i18n: new VueI18n({
      locale: "en",
      messages: {
        en: {
          message: "Hey dude"
        },
        es: {
          message: "Hola vato"
        }
      }
    }),
    template: `
      <div>
        <v-header></v-header>
        <div style="text-align: center">
          <h2>locale: {{ $store.getters.locale }}</h2>
          <h3>{{ $t("message") }}</h3>
        </div>
      </div>
    `
  }));

storiesOf("Footer", module).add("Footer", () => ({
  components: { VFooter },
  template: `<v-footer></v-footer>`
}));

storiesOf("EventGrid", module)
  .addDecorator(StoryRouter())
  .add("EventGrid", () => ({
    components: { VEventGrid },
    i18n,
    render() {
      return <v-event-grid events={eventsMock} />;
    }
  }))
  .add("with country select", () => ({
    components: { VHeader, VContainer, VEventGrid, VFooter },
    store: new Vuex.Store({
      state: { country: "us" },
      getters,
      actions,
      mutations
    }),
    i18n,
    data() {
      return { events: eventsMock };
    },
    template: `
      <div>
        <v-header></v-header>
        <v-container>
          <v-event-grid :events="events"></v-event-grid>
        </v-container>
        <v-footer></v-footer>
      </div>
    `
  }));

storiesOf("EventGridItem", module)
  .addDecorator(StoryRouter())
  .add("EventGridItem", () => ({
    components: { VEventGridItem },
    i18n,
    render() {
      return <v-event-grid-item event={eventsMock[0]} />;
    }
  }));

storiesOf("EventCard", module)
  .addDecorator(StoryRouter())
  .add("EventCard", () => ({
    components: { VEventCard },
    i18n,
    render() {
      return (
        <v-event-card event={eventsMock[1]}>
          <div style={{ height: "60vh" }} />
        </v-event-card>
      );
    }
  }));

storiesOf("EventDetail", module)
  .addDecorator(StoryRouter())
  .add("EventDetail", () => ({
    components: { VHeader, VContainer, VEventDetail, VFooter },
    store: new Vuex.Store({
      state: { country: "us" },
      getters,
      actions,
      mutations
    }),
    i18n,
    render() {
      return (
        <div>
          <v-header />
          <v-container>
            <v-event-detail event={eventsMock[0]} />
          </v-container>
          <v-footer />
        </div>
      );
    }
  }));

storiesOf("EventOffers", module).add("EventOffers", () => ({
  components: { VContainer, VEventOffers },
  render() {
    return (
      <v-container>
        <v-event-offers eventOffers={eventOffersMock} />
      </v-container>
    );
  }
}));
