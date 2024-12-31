<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();

const tabs = [
  { title: "Recent", value: "recents" },
  { title: "Featured", value: "featured" },
  { title: "Popular", value: "popular" },
] as const;

const feedTab = ref<(typeof tabs)[number]["value"] | null>(null);
</script>

<template>
  <div class="grid py-12">
    <div class="flex items-center justify-between px-4">
      <h3 class="text-2xl font-semibold">Stay Tuned</h3>
      <v-btn
        append-icon="mdi-arrow-top-right"
        variant="tonal"
        rounded="xl"
        active-color="primary"
        class="text-none"
        >View All</v-btn
      >
    </div>
    <div class="px-4 py-2">
      <v-tabs
        mobile
        class="grow"
        density="compact"
        v-model="feedTab"
        align-tabs="start"
        color="primary"
      >
        <v-tab
          v-for="{ title, value } in tabs"
          :key="value"
          :text="title"
          :value="value"
        ></v-tab>
      </v-tabs>
    </div>
    <v-tabs-window v-model="feedTab" class="pa-4">
      <v-tabs-window-item v-for="{ value } in tabs" :key="value" :value="value">
        <v-slide-group
          @vue:mounted="
            async () => {
              if (value === 'popular') {
                await appStore.fetchPopular();
              } else if (value === 'featured') {
                await appStore.fetchFeatured();
              } else {
                await appStore.fetchRecents();
              }
            }
          "
          show-arrows
        >
          <template #prev="{ prev }">
            <v-btn
              icon="mdi-chevron-left"
              density="comfortable"
              @click="prev"
            ></v-btn>
          </template>
          <template #next="{ next }">
            <v-btn
              icon="mdi-chevron-right"
              density="comfortable"
              @click="next"
            ></v-btn>
          </template>
          <v-slide-group-item
            :key="listing.id"
            v-for="listing in feedTab === 'popular'
              ? appStore.popular
              : feedTab === 'featured'
              ? appStore.featured
              : appStore.recents"
          >
            <div class="pa-4 max-w-lg min-w-[24rem]" :key="i" v-for="i in 4">
              <div class="p-card">
                <listing-feed-card :listing="listing" />
              </div>
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
<style scoped lang="css">
.p-card {
  @apply bg-white rounded-xl shadow-sm hover:scale-[1.02] duration-300 hover:shadow-md;
}
</style>
