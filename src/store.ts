import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
import * as api from "@/api";
import IEvent from "@/interfaces/Event";

Vue.use(Vuex);

interface State {
  country: "mx" | "us";
  events: IEvent[];
  selectedEvent: IEvent;
  loading: boolean;
  errors: any[];
}

const state: State = {
  country: "us",
  events: [],
  selectedEvent: { id: "", name: "", images: [] },
  loading: false,
  errors: []
};

export const getters = {
  locale(state: State) {
    const { country } = state;
    if (country === "mx") {
      return "es";
    } else if (country === "us") {
      return "en";
    } else {
      return "en";
    }
  }
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
  },
  setLoading(state: State, loading: boolean) {
    state.loading = loading;
  },
  setErrors(state: State, errors: any[]) {
    state.errors = errors;
  }
};

export const actions = {
  setCountry({ state, commit }: ActionContext<State, State>, country: string) {
    if (state.country !== country) {
      commit("setCountry", country);
    }
  },
  async fetchEvents({ commit }: ActionContext<State, State>) {
    commit("setLoading", true);
    try {
      const result = await api.fetchEvents();
      const { _embedded } = result;
      commit("setEvents", _embedded.events);
    } catch (err) {
      commit("setErrors", [err]);
    }
    commit("setLoading", false);
  },
  async fetchEventDetails(
    { state, commit }: ActionContext<State, State>,
    id: string
  ) {
    commit("setLoading", true);
    try {
      const cachedEvent = state.events.find(event => event.id === id);
      if (cachedEvent) {
        commit("setSelectedEvent", cachedEvent);
      } else {
        const event = await api.fetchEventDetails(id);
        commit("setSelectedEvent", event);
      }
    } catch (err) {
      commit("setErrors", [err]);
    }
    commit("setLoading", false);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
