<template>
  <v-loading v-if="loading"></v-loading>
  <v-errors v-else-if="errors.length !== 0" :errors="errors"></v-errors>
  <v-event-grid v-else :events="events"></v-event-grid>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { fetchEvents } from "@/api";
import IEvent from "@/interfaces/Event";
import VLoading from "@/components/Loading.vue";
import VErrors from "@/components/Errors.vue";
import VEventGrid from "@/components/EventGrid.vue";

@Component({ components: { VLoading, VErrors, VEventGrid } })
export default class Home extends Vue {
  @State("events") public events!: IEvent[];
  @State("errors") public errors!: any[];
  @State("loading") public loading!: boolean;
  @Action("fetchEvents") public fetchEvents: any;

  public mounted() {
    this.fetchEvents();
  }
}
</script>
