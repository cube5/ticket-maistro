/* eslint-disable import/no-extraneous-dependencies */
import Vuex from "vuex";
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import StoryRouter from "storybook-vue-router";

import { actions, mutations } from "@/store";
import VButton from "@/components/Button.vue";
import VHeader from "@/components/Header.vue";
import VEventGrid from "@/components/EventGrid.vue";
import VEventGridItem from "@/components/EventGridItem.vue";
import VEventDetail from "@/components/EventDetail.vue";
import eventsMock from "../../tests/mocks/events";
import "@/filters";
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
    template: `<v-header></v-header>`
  }))
  .add("with country select", () => ({
    components: { VHeader },
    store: new Vuex.Store({
      state: { country: "us" },
      actions,
      mutations
    }),
    template: `
    <div>
      <v-header></v-header>
      <h2 style="text-align: center">{{ $store.state.country }}</h2>
    </div>
  `
  }));

storiesOf("EventGrid", module)
  .addDecorator(StoryRouter())
  .add("EventGrid", () => ({
    components: { VEventGrid },
    render() {
      return <v-event-grid events={eventsMock} />;
    }
  }))
  .add("with country select", () => ({
    components: { VHeader, VEventGrid },
    store: new Vuex.Store({
      state: { country: "us" },
      actions,
      mutations
    }),
    render() {
      return (
        <div>
          <v-header />
          <v-event-grid events={eventsMock} />
        </div>
      );
    }
  }));

storiesOf("EventGridItem", module)
  .addDecorator(StoryRouter())
  .add("EventGridItem", () => ({
    components: { VEventGridItem },
    render() {
      return <v-event-grid-item event={eventsMock[0]} />;
    }
  }));

storiesOf("EventDetail", module).add("EventDetail", () => ({
  components: { VEventDetail },
  render() {
    return <v-event-detail event={eventsMock[1]} />;
  }
}));
