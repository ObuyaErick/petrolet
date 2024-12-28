// Utilities
import useAPI from "@/composables/useAPI";
import { ApiBuilder } from "@/lib/APIS";
import type { CarListing } from "@/lib/types";
import axios from "axios";
import { defineStore } from "pinia";

const handleRequest = useAPI();

export const useAppStore = defineStore("app", {
  state: () => ({
    drawer: null as boolean | null,
    feed: {
      recents: [],
      featured: [],
      popular: [],
    } as Record<"recents" | "featured" | "popular", CarListing[]>,
  }),
  getters: {
    recents(state) {
      return state.feed.recents;
    },
    featured(state) {
      return state.feed.featured;
    },
    popular(state) {
      return state.feed.popular;
    },
  },
  actions: {
    async fetchRecents() {
      const res = await handleRequest<CarListing[]>({
        func: axios.get,
        args: [ApiBuilder.getInstance("LISTINGS-RECENTS").build()],
      });
      if (res.status === "ok") {
        this.feed.recents = res.result;
      }
    },
    async fetchFeatured() {
      const res = await handleRequest<CarListing[]>({
        func: axios.get,
        args: [ApiBuilder.getInstance("LISTINGS-FEATURED").build()],
      });
      if (res.status === "ok") {
        this.feed.featured = res.result;
      }
    },
    async fetchPopular() {
      const res = await handleRequest<CarListing[]>({
        func: axios.get,
        args: [ApiBuilder.getInstance("LISTINGS-POPULAR").build()],
      });
      if (res.status === "ok") {
        this.feed.popular = res.result;
      }
    },
  },
});
