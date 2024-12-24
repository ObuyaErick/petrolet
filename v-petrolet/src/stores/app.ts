// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    drawer: null as boolean | null,
  }),
});
