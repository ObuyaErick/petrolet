<template>
  <div class="p-2 grid gap-4 container mx-auto">
    <v-card class="pa-4">
      <div class="flex">
        <v-select
          density="comfortable"
          clearable
          multiple
          chips
          closable-chips
          item-title="title"
          item-value="key"
          return-object
          v-model="groupBy"
          variant="plain"
          :items="groups"
          label="Group By"
        >
          <template #chip="{ item }">
            <v-chip
              @click.prevent="() => toggleGroupingOrder(item.value)"
              color="primary"
              >{{ `${item.value}` }}
              <template #append>
                <v-icon class="ms-2">{{
                  item.value.order === "asc"
                    ? "mdi-sort-ascending"
                    : "mdi-sort-descending"
                }}</v-icon>
              </template>
            </v-chip>
          </template>
        </v-select>
      </div>
      <div class="flex justify-end">
        <v-btn variant="elevated" color="primary">Apply Filters</v-btn>
      </div>
    </v-card>
    <v-card>
      <v-data-table-server
        hover
        density="comfortable"
        items-per-page-text="per page"
        show-current-page
        :group-by="groupBy"
        show-expand
        :headers="headers"
        :items-per-page="carsPerPage"
        :items-length="totalNumberOfCars"
        :items="cars"
        :loading="loading"
        next-page-label="Next"
        @update:options="loadItems"
      >
        <template #header.data-table-expand>
          <div class="flex flex-col items-center justify-center">
            <span class="text-xs">More</span>
            <v-icon color="primary">mdi-dots-horizontal-circle-outline</v-icon>
          </div>
        </template>
        <template
          #item.data-table-expand="{ isExpanded, toggleExpand, internalItem }"
        >
          <v-btn
            class=""
            :icon="isExpanded(internalItem) ? '$expand' : '$next'"
            size="small"
            variant="text"
            color="primary"
            @click="toggleExpand(internalItem)"
          ></v-btn>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <div class="grid">
                <car-inventory-listing-item
                  class="grid"
                  :car-listing-item="item"
                ></car-inventory-listing-item>
              </div>
            </td>
          </tr>
        </template>
        <template #loading>
          <v-skeleton-loader type="table-row@6"></v-skeleton-loader>
        </template>
        <template #group-header="{ item, columns, toggleGroup, isGroupOpen }">
          <tr>
            <td :colspan="columns.length">
              <span class="flex items-center gap-2">
                <v-btn
                  class=""
                  :icon="isGroupOpen(item) ? '$expand' : '$next'"
                  size="small"
                  variant="text"
                  color="primary"
                  @click="toggleGroup(item)"
                ></v-btn>
                <span>{{ item.value }}</span>
                <span> ({{ item.items.length }})</span>
              </span>
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { carListings } from "@/lib/data";
import type { CarListing } from "@/lib/types";

interface DataLoaderProps {
  page: number;
  itemsPerPage: number;
  sortBy: { key: keyof CarListing; order: "asc" | "desc" }[];
}

interface GroupByItem {
  key: keyof CarListing;
  order: "asc" | "desc";
}

const groups = [
  { title: "Make", key: "make" },
  { title: "Model", key: "model" },
  { title: "Year", key: "year" },
  { title: "Mode of Transmission", key: "transmission" },
  { title: "Color", key: "color" },
  { title: "Current Condition", key: "condition" },
  { title: "Type of Fuel", key: "fuelType" },
];
const groupBy = ref<{ title: string; key: string }[]>([]);
const groupedSorting = ref<GroupByItem[]>([])

// watch(groupBy, (newValue) => {
// groupedSorting.value = newValue.map()
// })

const carsPerPage = ref(5);
const totalNumberOfCars = ref(0);
const loading = ref(true);
const cars = ref<CarListing[]>([]);
const headers = [
  { title: "Title", align: "start", key: "title" },
  { title: "Make", align: "start", key: "make" },
  { title: "Model", align: "start", key: "model" },
  { title: "Year", align: "start", key: "year" },
  { title: "Transmission", align: "start", key: "transmission" },
  { title: "Color", align: "start", key: "color" },
  { title: "Mileage (miles)", key: "mileage", align: "end" },
  { title: "Condition", key: "condition", sortable: false },
  { title: "Price (USD)", key: "price", align: "end" },
];

const toggleGroupingOrder = (groupByItem: GroupByItem) => {
  groupBy.value = groupBy.value.map((v) =>
    v.key === groupByItem.key
      ? { ...v, order: groupByItem.order === "asc" ? "desc" : "asc" }
      : v
  );
};

const FakeAPI = {
  async fetch({
    page,
    itemsPerPage,
    sortBy,
  }: DataLoaderProps): Promise<{ items: CarListing[]; total: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const carsCopy = carListings.slice();

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          carsCopy.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            if (typeof aValue === "number" && typeof bValue === "number") {
              return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
            }
            return bValue > aValue ? (sortOrder === "desc" ? -1 : 1) : 0;
          });
        }

        const paginated = carsCopy.slice(start, end);

        resolve({ items: paginated, total: carsCopy.length });
      }, 3000);
    });
  },
};

const loadItems = ({ page, itemsPerPage, sortBy }: DataLoaderProps) => {
  loading.value = true;
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    cars.value = items;
    totalNumberOfCars.value = total;
    loading.value = false;
  });
};
</script>
