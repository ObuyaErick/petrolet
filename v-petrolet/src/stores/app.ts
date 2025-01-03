// Utilities
import useAPI from "@/composables/useAPI";
import { ApiBuilder } from "@/lib/APIS";
import type { CarListing, Paginated } from "@/lib/types";
import axios from "axios";
import { defineStore } from "pinia";

const handleRequest = useAPI();

export const useAppStore = defineStore("app", {
  state: () => ({
    drawer: null as boolean | null,
    feed: {
      recents: { data: [], page: 1, limit: 10, total: 0 },
      featured: { data: [], page: 1, limit: 10, total: 0 },
      popular: { data: [], page: 1, limit: 10, total: 0 },
    } as Record<"recents" | "featured" | "popular", Paginated<CarListing>>,
  }),
  getters: {
    recents(state) {
      return state.feed.recents.data;
    },
    featured(state) {
      return state.feed.featured.data;
    },
    popular(state) {
      return state.feed.popular.data;
    },
  },
  actions: {
    async fetchRecents() {
      const res = await handleRequest<Paginated<CarListing>>({
        func: axios.get,
        args: [ApiBuilder.getInstance("LISTINGS-RECENTS").build()],
      });
      if (res.status === "ok") {
        this.feed.recents = res.result;
      }
    },
    async fetchFeatured() {
      const res = await handleRequest<Paginated<CarListing>>({
        func: axios.get,
        args: [ApiBuilder.getInstance("LISTINGS-FEATURED").build()],
      });
      if (res.status === "ok") {
        this.feed.featured = res.result;
      }
    },
    async fetchPopular() {
      const res = await handleRequest<Paginated<CarListing>>({
        func: axios.get,
        args: [ApiBuilder.getInstance("LISTINGS-POPULAR").build()],
      });
      if (res.status === "ok") {
        this.feed.popular = res.result;
      }
    },
  },
});
