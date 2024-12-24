// Utilities
import useAPI from "@/composables/useAPI";
import { ApiBuilder } from "@/lib/APIS";
import type { CarListing, Paginated, SortRequest } from "@/lib/types";
import axios from "axios";
import { defineStore } from "pinia";

const handleRequest = useAPI();

export const useListingStore = defineStore("#pinia-listings", {
  state: () => ({
    // Store is performing a request
    _busy: false as boolean,
    // Paginated set of students
    _listings: { data: [], page: 1, limit: 10, total: 0 } as {
      data: CarListing[];
    } & Paginated,
  }),
  getters: {
    isBusy(state) {
      return state._busy;
    },
    listings(state) {
      return state._listings.data;
    },
    total(state) {
      return state._listings.total;
    },
    currentPage(state) {
      return state._listings.page;
    },
    perPage(state) {
      return state._listings.limit;
    },
    currentPageSize(state) {
      return state._listings.data.length;
    },
  },
  actions: {
    async fetch(
      spec:
        | {
            page?: number;
            limit?: number;
            sortBy?: SortRequest[];
            filter?: Record<string, string>;
            search?: string;
          }
        | undefined = undefined
    ) {
      this._busy = true;

      await handleRequest<{ data: CarListing[] } & Paginated>({
        func: axios.get,
        args: [
          ApiBuilder.getInstance("LISTINGS-INDEX").build({
            ...(spec?.page ? { page: spec.page } : {}),
            ...(spec?.limit ? { limit: spec.limit } : {}),
            // Add Filters
            ...(spec?.filter
              ? {
                  filter: Object.entries(spec.filter)
                    .map(
                      ([filterKey, filterValue]) =>
                        `${filterKey}<>${filterValue}`
                    )
                    .join("<|>"),
                }
              : {}),
            // Add search
            ...(spec?.search ? { search: spec.search } : {}),
            // Add sorting to the query string if at least the first SortRequest exists
            ...(spec?.sortBy && spec?.sortBy.length
              ? { order: `${spec?.sortBy[0].key},${spec?.sortBy[0].order}` }
              : {}),
          }),
        ],
      })
        .then((res) => {
          if (res.status === "ok") {
            this._listings = res.result;
          }
        })
        .finally(() => (this._busy = false));
    },
  },
});
