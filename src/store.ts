import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
import * as api from "@/api";
import IEvent from "@/interfaces/Event";

Vue.use(Vuex);

interface State {
  country: "mx" | "us";
  events: IEvent[];
  selectedEvent: IEvent;
}

const state: State = {
  country: "us",
  events: [],
  selectedEvent: { id: "", name: "", images: [] }
};

export const mutations = {
  setCountry(state: State, country: "mx" | "us") {
    state.country = country;
  },
  setEvents(state: State, fetchedEvents: IEvent[]) {
    state.events = fetchedEvents;
  },
  setSelectedEvent(state: State, event: IEvent) {
    state.selectedEvent = event;
  }
};

export const actions = {
  setCountry({ state, commit }: ActionContext<State, State>, country: string) {
    if (state.country !== country) {
      commit("setCountry", country);
    }
  },
  async fetchEvents({ commit }: ActionContext<State, State>) {
    const result = await api.fetchEvents();
    const { _embedded } = result;
    commit("setEvents", _embedded.events);
  },
  async fetchEventDetails(
    { state, commit }: ActionContext<State, State>,
    id: string
  ) {
    const cachedEvent = state.events.find(event => event.id === id);
    if (cachedEvent) {
      commit("setSelectedEvent", cachedEvent);
    } else {
      const event = await api.fetchEventDetails(id);
      commit("setSelectedEvent", event);
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
