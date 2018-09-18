<template>
  <v-event-grid :events="events"></v-event-grid>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { fetchEvents } from "@/api";
import IEvent from "@/interfaces/Event";
import VEventGrid from "@/components/EventGrid.vue";

@Component({ components: { VEventGrid } })
export default class Home extends Vue {
  @State("events") public events!: IEvent[];
  @Action("fetchEvents") public fetchEvents: any;

  public mounted() {
    this.fetchEvents();
  }
}
</script>
