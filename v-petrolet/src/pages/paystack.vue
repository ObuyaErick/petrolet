<template>
  <div>
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
      :items-length="numberOfBanks"
      :items="banks"
      :loading="loading"
      next-page-label="Next"
      @update:options="loadItems"
    >
      <template #top>
        <div class="flex gap-3 p-3">
          <div class="grow">
            <v-select
              density="comfortable"
              clearable
              chips
              closable-chips
              multiple
              item-title="title"
              item-value="key"
              return-object
              v-model="groupBy"
              variant="solo"
              :items="groups"
              label="Group By"
            >
              <template #details>
                <div class="w-full">Groupings</div>
              </template>
              <template #chip="{ item, props }">
                <v-chip closable v-bind="props" color="primary"
                  >{{ `${item.value}` }}
                </v-chip>
              </template>
            </v-select>
          </div>
          <div class="grow">
            <v-select
              clearable
              density="comfortable"
              return-object
              v-model="filters.currency"
              variant="solo"
              :items="['NGN', 'USD', 'GHS', 'ZAR', 'KES']"
              label="Currency"
            >
              <template #details>
                <div class="w-full">Choose Currency</div>
              </template>
            </v-select>
          </div>
          <div class="grow">
            <v-select
              clearable
              density="comfortable"
              return-object
              v-model="filters.type"
              variant="solo"
              :items="[
                null,
                'ghipss',
                'mobile_money',
                'mobile_money_business',
                'kepss',
                'nuban',
                'basa',
              ]"
              label="Type"
            >
              <template #details>
                <div class="w-full">Choose Type</div>
              </template>
            </v-select>
          </div>
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
  </div>
</template>
<script setup lang="ts">
import type {
  DataTableHeader,
  GroupByItem,
  PaystackBank,
  VDataLoaderProps,
} from "@/lib/types";
import axios from "axios";

const banks = ref<PaystackBank[]>([]);
const loading = ref(false);

const filters = ref<Record<string, string>>({
  currency: "NGN",
});

const groups = [
  { title: "Bank Details", key: "name" },
  { title: "Code", key: "code" },
  { title: "Gateway", key: "gateway" },
  { title: "Country", key: "country" },
  { title: "Currency", key: "currency" },
  { title: "Type", key: "type" },
  { title: "Status", key: "active" },
];
const groupBy = ref<GroupByItem[]>([]);

const numberOfBanks = computed(() => {
  return banks.value.length;
});

const headers: DataTableHeader[] = [
  { title: "ID", align: "end", key: "id" },
  { title: "Bank Name", align: "start", key: "name" },
  { title: "Slug", align: "start", key: "slug" },
  { title: "Bank Code", align: "start", key: "code" },
  { title: "Long Code", align: "start", key: "longcode" },
  { title: "Gateway", align: "start", key: "gateway" },
  { title: "Pay With Bank", align: "center", key: "pay_with_bank" },
  { title: "Supports Transfer", align: "center", key: "supports_transfer" },
  { title: "Status", align: "center", key: "active" },
  { title: "Country", align: "start", key: "country" },
  { title: "Currency", align: "start", key: "currency" },
  { title: "Type", align: "start", key: "type" },
  { title: "Is Deleted", align: "center", key: "is_deleted" },
  //   { title: "Created At", align: "start", key: "createdAt" },
  //   { title: "Updated At", align: "start", key: "updatedAt" },
];

watch(
  () => filters.value,
  (n) => {
    loadItems({});
  },
  { deep: true }
);

const loadItems = ({ page, itemsPerPage, sortBy }: VDataLoaderProps) => {
  loading.value = true;
  axios
    .get("http://localhost:4000/paystack/list-supported-banks", {
      params: Object.entries(filters.value)
        .filter(([, v]) => !!v)
        .reduce((acc, [key, v]) => {
          return { ...acc, [key]: v };
        }, {}),
    })
    .then((res) => {
      banks.value = res.data.data as PaystackBank[];
    })
    .catch((_err) => {
      //
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
