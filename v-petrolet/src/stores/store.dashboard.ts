import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard-store", {
  state: () => ({
    _drawer: null as null | boolean,
  }),
  getters: {
    drawer(state) {
      return state._drawer;
    },
  },
  actions: {
    toggleDrawer() {
      this._drawer = !this._drawer;
    },
  },
});
