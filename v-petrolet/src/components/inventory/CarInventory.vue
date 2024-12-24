<template>
  <div class="p-2 grid gap-2 container mx-auto">
    <v-text-field
      hide-details
      placeholder="Type anything, let's find a best match for you"
      variant="solo"
      prepend-inner-icon="mdi-magnify"
      v-model="search"
    >
      <template #append-inner>
        <v-btn @click="applySearch" variant="elevated" color="primary"
          >Search</v-btn
        >
      </template>
    </v-text-field>

    <v-card class="" elevation="1">
      <div class="grow flex items-center">
        <v-menu
          v-model="advancedFilters.showMenu"
          :close-on-content-click="false"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              variant="tonal"
              icon
              rounded="sm"
              elevation="0"
              class="ma-1"
              color="primary"
              icons
            >
              <v-icon size="small">mdi-filter-multiple-outline</v-icon>
            </v-btn>
          </template>

          <v-card class="border">
            <div class="flex items-center">
              <v-card-title>Advance Filters</v-card-title>
              <v-spacer></v-spacer>
              <v-btn
                @click="advancedFilters.showMenu = false"
                color="error"
                density="comfortable"
                class="mx-2"
                icon="mdi-close"
              ></v-btn>
            </div>

            <v-card-text class="grid gap-3">
              <!-- Make and Color -->
              <div class="grid sm:grid-cols-2 gap-3">
                <v-select
                  clearable
                  chips
                  closable-chips
                  multiple
                  density="comfortable"
                  return-object
                  v-model="advancedFilters.makes"
                  variant="solo"
                  :items="makes"
                  label="Makes"
                >
                  <template #details>
                    <div class="w-full">Choose your favorite makes</div>
                  </template>
                </v-select>
                <v-select
                  clearable
                  chips
                  closable-chips
                  multiple
                  density="comfortable"
                  return-object
                  v-model="advancedFilters.colors"
                  variant="solo"
                  :items="['White', 'Red', 'Black', 'Gray', 'Silver']"
                  label="Colors"
                >
                  <template #details>
                    <div class="w-full">Choose your favorite color</div>
                  </template>
                </v-select>
              </div>

              <!-- Transmission and Condition -->
              <div class="grid sm:grid-cols-2 gap-3">
                <v-select
                  clearable
                  hide-details
                  density="comfortable"
                  v-model="advancedFilters.transmission"
                  variant="solo"
                  :items="['Automatic', 'Manual']"
                >
                  <template #prepend-inner>
                    <v-label class="w-full">Transmission</v-label>
                  </template>
                </v-select>
                <v-select
                  clearable
                  hide-details
                  density="comfortable"
                  v-model="advancedFilters.condition"
                  variant="solo"
                  :items="['New', 'Used']"
                >
                  <template #prepend-inner>
                    <v-label class="w-full">Condition</v-label>
                  </template>
                </v-select>
              </div>

              <!-- Year range -->
              <div>
                <v-label class="px-3">Specify year range</v-label>
                <div class="grid sm:grid-cols-2 gap-3">
                  <v-select
                    clearable
                    density="comfortable"
                    v-model="advancedFilters.years.start"
                    variant="solo"
                    :items="computeNYearsToDate(30)"
                  >
                    <template #prepend-inner>
                      <v-label class="w-full">Start:</v-label>
                    </template>
                    <template #details>
                      <div class="w-full">earliest year</div>
                    </template>
                  </v-select>
                  <v-select
                    clearable
                    density="comfortable"
                    v-model="advancedFilters.years.end"
                    variant="solo"
                    :items="computeNYearsToDate(30)"
                  >
                    <template #prepend-inner>
                      <v-label class="w-full">End:</v-label>
                    </template>
                    <template #details>
                      <div class="w-full">latest year</div>
                    </template>
                  </v-select>
                </div>
              </div>

              <!-- Mileage -->
              <div>
                <v-label class="px-3">Specify Mileage</v-label>
                <div class="grid sm:grid-cols-2 gap-3">
                  <v-text-field
                    type="number"
                    clearable
                    hide-details
                    density="comfortable"
                    v-model="advancedFilters.mileage.start"
                    variant="solo"
                    suffix="miles"
                    min="0"
                    :max="advancedFilters.mileage.end || Number.MAX_VALUE"
                  >
                    <template #prepend-inner>
                      <v-label class="w-full">Start:</v-label>
                    </template>
                  </v-text-field>
                  <v-text-field
                    type="number"
                    clearable
                    hide-details
                    density="comfortable"
                    v-model="advancedFilters.mileage.end"
                    variant="solo"
                    suffix="miles"
                    :min="advancedFilters.mileage.start || 0"
                    :max="Number.MAX_VALUE"
                  >
                    <template #prepend-inner>
                      <v-label class="w-full">End:</v-label>
                    </template>
                  </v-text-field>
                </div>
              </div>
              <div>
                <v-label class="px-3">Specify Budget</v-label>
                <div class="grid sm:grid-cols-2 gap-3">
                  <v-text-field
                    type="number"
                    clearable
                    density="comfortable"
                    v-model="advancedFilters.price.start"
                    variant="solo"
                    suffix="USD"
                    min="0"
                    :max="advancedFilters.price.end || Number.MAX_VALUE"
                  >
                    <template #prepend-inner>
                      <v-label class="w-full">Minimum:</v-label>
                    </template>
                    <template #details>
                      <div class="w-full">
                        lowest amount you are will to spend
                      </div>
                    </template>
                  </v-text-field>
                  <v-text-field
                    type="number"
                    clearable
                    density="comfortable"
                    v-model="advancedFilters.price.end"
                    variant="solo"
                    suffix="USD"
                    :min="advancedFilters.price.start || 0"
                    :max="Number.MAX_VALUE"
                  >
                    <template #prepend-inner>
                      <v-label class="w-full">Maximum:</v-label>
                    </template>
                    <template #details>
                      <div class="w-full">
                        highest amount you are will to spend
                      </div>
                    </template>
                  </v-text-field>
                </div>
              </div>

              <div class="flex justify-end gap-3">
                <v-btn
                  @click="clearAdvancedFilters"
                  color="surface-variant"
                  prepend-icon="mdi-refresh"
                  >Clear</v-btn
                >
                <v-btn
                  @click="applyAdvancedFilters"
                  color="primary"
                  prepend-icon="mdi-check-circle"
                  >Apply Filters</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </v-menu>

        <div class="flex-grow px-3 border-s border-e">
          <v-select
            clearable
            hide-details
            density="comfortable"
            item-title="title"
            item-value="key"
            return-object
            v-model="basicFilters.make"
            variant="plain"
            :items="makes"
          >
            <template #prepend-inner>
              <v-label>Make</v-label>
            </template>
          </v-select>
        </div>
        <div class="flex-grow px-3 border-e">
          <v-select
            clearable
            hide-details
            density="comfortable"
            item-title="title"
            item-value="key"
            return-object
            v-model="basicFilters.year"
            variant="plain"
            :items="computeNYearsToDate(30).map(String)"
          >
            <template #prepend-inner>
              <v-label>Year</v-label>
            </template>
          </v-select>
        </div>
        <div class="flex-grow px-3">
          <v-select
            clearable
            hide-details
            density="comfortable"
            item-title="title"
            item-value="key"
            return-object
            v-model="basicFilters.transmission"
            variant="plain"
            :items="['Automatic', 'Manual']"
          >
            <template #prepend-inner>
              <v-label>Transmission</v-label>
            </template>
          </v-select>
        </div>
      </div>
    </v-card>

    <v-card elevation="1">
      <v-data-table-server
        hover
        density="comfortable"
        items-per-page-text="cars per page"
        :items-per-page-options="
          [5, 10, 15, 20, 25, 50, 75, 100].map((v) => ({
            title: `${v}`,
            value: v,
          }))
        "
        show-current-page
        :group-by="groupBy"
        show-expand
        :headers="headers.filter((h) => !groupBy.some((g) => g.key === h.key))"
        :items-per-page="listingStore.perPage"
        :items-length="listingStore.total"
        :items="listingStore.listings"
        :loading="listingStore.isBusy"
        next-page-label="Next"
        @update:options="loadItems"
      >
        <template #top>
          <div class="flex items-center gap-1.5 pl-4">
            <div>
              <v-select
                hide-details
                density="comfortable"
                clearable
                chips
                closable-chips
                multiple
                item-title="title"
                item-value="key"
                return-object
                v-model="groupBy"
                variant="plain"
                :items="groups"
              >
                <template #prepend-inner>
                  <v-label class="">Group By:</v-label>
                </template>
                <template #chip="{ item, props }">
                  <v-chip closable v-bind="props" color="primary"
                    >{{ `${item.value}` }}
                  </v-chip>
                </template>
              </v-select>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              @click="clearAllFilters"
              class="ma-2"
              variant="elevated"
              color="primary"
              >Clear All Filters</v-btn
            >
          </div>
        </template>
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
            density="comfortable"
            class=""
            :icon="isExpanded(internalItem) ? '$expand' : '$next'"
            size="small"
            :variant="isExpanded(internalItem) ? 'elevated' : 'text'"
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
                  density="comfortable"
                  class=""
                  :icon="isGroupOpen(item) ? '$expand' : '$next'"
                  size="small"
                  :variant="isGroupOpen(item) ? 'elevated' : 'text'"
                  color="primary"
                  @click="toggleGroup(item)"
                ></v-btn>
                <span>{{ item.value }}</span>
                <span> ({{ item.items.length }})</span>
              </span>
            </td>
          </tr>
        </template>
        <template #no-data>
          <v-empty-state
            icon="mdi-information-variant-circle-outline"
            text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
            title="No results found."
          >
          </v-empty-state>
        </template>
      </v-data-table-server>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import {
  initPetroletRange,
  type GroupByItem,
  type PetroletRange,
  type VDataLoaderProps,
} from "@/lib/types";
import { useListingStore } from "@/stores/listings";

const listingStore = useListingStore();

const initBasicFilters = () => ({ make: "", year: "", transmission: "" });

const search = ref("");

const basicFilters = ref<{
  make: string;
  year: string;
  transmission: string;
}>(initBasicFilters());

const initAdvancedFilters = () => ({
  showMenu: false,
  makes: [],
  condition: "",
  years: initPetroletRange(),
  transmission: "",
  colors: [],
  mileage: initPetroletRange(),
  price: initPetroletRange(0),
});

const advancedFilters = ref<{
  showMenu: boolean;
  makes: string[];
  condition: string;
  years: PetroletRange;
  transmission: string;
  colors: string[];
  mileage: PetroletRange;
  price: PetroletRange;
}>(initAdvancedFilters());

const filterCandidates = ref<Record<string, string> | null>(null);
// const searchCandidate = ref<string | null>(null);

const applySearch = () => {
  if (search.value) {
    loadItems({
      page: listingStore.currentPage,
      itemsPerPage: listingStore.perPage,
      sortBy: [],
    });
  }
};

const clearAdvancedFilters = () => {
  advancedFilters.value = initAdvancedFilters();
};

const clearBasicFilters = () => {
  basicFilters.value = initBasicFilters();
};

const clearAllFilters = () => {
  clearAdvancedFilters();
  clearBasicFilters();
  search.value = "";
  filterCandidates.value = null;
  groupBy.value = [];
  loadItems({ page: 1, itemsPerPage: listingStore.perPage });
};

const applyAdvancedFilters = () => {
  const non_NullOrEmpty_Entries = Object.entries(basicFilters.value).filter(
    ([_, v]) => !!v
  );
  const f: Record<string, string> =
    non_NullOrEmpty_Entries.length > 0
      ? Object.fromEntries(non_NullOrEmpty_Entries)
      : {};

  if (advancedFilters.value.makes?.length) {
    f.make = `${f.make ? f.make + "," : ""}${advancedFilters.value.makes.join(
      ","
    )}`;
  }
  if (advancedFilters.value.transmission) {
    f.transmission = advancedFilters.value.transmission;
  }
  if (advancedFilters.value.condition) {
    f.condition = advancedFilters.value.condition;
  }
  if (advancedFilters.value.colors?.length) {
    f.color = advancedFilters.value.colors.join(",");
  }
  if (advancedFilters.value.years.start || advancedFilters.value.years.end) {
    f.year = `${advancedFilters.value.years.start || ""}-${
      advancedFilters.value.years.end || ""
    }`;
  }
  if (
    advancedFilters.value.mileage.start ||
    advancedFilters.value.mileage.end
  ) {
    f.mileage = `${advancedFilters.value.mileage.start || ""}-${
      advancedFilters.value.mileage.end || ""
    }`;
  }
  if (advancedFilters.value.price.start || advancedFilters.value.price.end) {
    f.price = `${advancedFilters.value.price.start || ""}-${
      advancedFilters.value.price.end || ""
    }`;
  }

  filterCandidates.value = f;
  advancedFilters.value.showMenu = false;
  if (Object.keys(f).length) {
    loadItems({ page: 1, itemsPerPage: listingStore.perPage });
  }
};

const groups = [
  { title: "Make", key: "make" },
  { title: "Model", key: "model" },
  { title: "Year", key: "year" },
  { title: "Mode of Transmission", key: "transmission" },
  { title: "Color", key: "color" },
  { title: "Current Condition", key: "condition" },
  { title: "Type of Fuel", key: "fuelType" },
];
const groupBy = ref<GroupByItem[]>([]);

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

const makes = ref([
  "Nissan",
  "Hyundai",
  "Porsche",
  "Kia",
  "Chevrolet",
  "BMW",
  "Honda",
  "Tesla",
  "Toyota",
  "Ford",
  "Volkswagen",
  "Jeep",
  "Mercedes-Benz",
  "Subaru",
  "Audi",
]);

const loadItems = ({ page, itemsPerPage, sortBy }: VDataLoaderProps) => {
  listingStore.fetch({
    page,
    limit: itemsPerPage,
    sortBy,
    ...(filterCandidates.value &&
    Object.keys(filterCandidates.value || {}).length
      ? { filter: filterCandidates.value }
      : {}),
    ...(search.value ? { search: search.value } : {}),
  });
};

function computeNYearsToDate<T extends string | number>(n: number = 1): T[] {
  return new Array(n > 0 ? n : 1)
    .fill(new Date().getFullYear())
    .map((thisYear, index) => (thisYear - index) as T);
}

watch(
  basicFilters,
  (newBasicFilters) => {
    const nonNulOrEmptyEntries = Object.entries(newBasicFilters).filter(
      ([_, v]) => !!v
    );
    if (nonNulOrEmptyEntries.length) {
      filterCandidates.value = Object.fromEntries(nonNulOrEmptyEntries);
      loadItems({
        page: listingStore.currentPage,
        itemsPerPage: listingStore.perPage,
        sortBy: [],
      });
    }
  },
  {
    deep: true,
  }
);
</script>
