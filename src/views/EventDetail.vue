<template>
  <v-loading v-if="loading"></v-loading>
  <v-errors v-else-if="errors.length !== 0" :errors="errors"></v-errors>
  <div v-else-if="!event || !eventOffers"><v-loading></v-loading></div>
  <v-event-detail v-else :event="event" :eventOffers="eventOffers"></v-event-detail>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { fetchEventOffers } from "@/api";
import IEvent from "@/interfaces/Event";
import VLoading from "@/components/Loading.vue";
import VErrors from "@/components/Errors.vue";
import VEventDetail from "@/components/EventDetail.vue";

@Component({
  components: { VEventDetail, VLoading, VErrors }
})
export default class EventDetail extends Vue {
  @State("loading") public loading!: boolean;
  @State("errors") public errors!: any[];
  @State("selectedEvent") public event!: IEvent;
  @Action("fetchEventDetails") public fetchEventDetails: any;

  public eventOffers: any = null;

  public async mounted() {
    const { id } = this.$route.params;
    this.fetchEventDetails(id);
    this.eventOffers = await fetchEventOffers(id);
  }
}
</script>
