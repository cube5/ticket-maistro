<template>
  <v-event-detail :event="event"></v-event-detail>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { fetchEventDetails, fetchEventOffers } from "@/api";
import IEvent from "@/interfaces/Event";
import VEventDetail from "@/components/EventDetail.vue";

@Component({
  components: { VEventDetail }
})
export default class EventDetail extends Vue {
  @State("selectedEvent") public event!: IEvent;
  @Action public fetchEventDetails: any;

  public async mounted() {
    const { id } = this.$route.params;
    this.fetchEventDetails(id);
  }
}
</script>
