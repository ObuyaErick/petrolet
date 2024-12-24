<template>
  <div class="grid">
    <v-tabs
      v-model="tab"
      class=""
      density="compact"
      align-tabs="start"
      color="primary"
    >
      <v-tab value="details" text="Details"></v-tab>
      <v-tab value="gallery" text="Gallery"></v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="details">
        <div class="py-2">
          <div class="flex items-start gap-1">
            <v-icon color="primary">mdi-music-accidental-sharp</v-icon>
            <span>{{ carListingItem.title }}</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 my-2 border-t border-e">
            <div class="text-sm px-2 py-1.5 border-b border-s">
              <div class="flex items-start gap-1.5">
                <v-icon color="primary" size="small">mdi-details</v-icon>
                <v-label>Description</v-label>
              </div>
              <div>
                <span>{{ carListingItem.description }}</span>
              </div>
            </div>

            <div
              class="text-sm flex items-start gap-1.5 px-2 py-1.5 border-b border-s"
            >
              <v-icon color="primary">mdi-map-marker-outline</v-icon>
              <v-label>Location:</v-label>
              <span>{{ carListingItem.location }}</span>
            </div>
            <div class="text-sm px-2 py-1.5 border-b border-s">
              <span><v-label>Make:</v-label> {{ carListingItem.make }}</span>
              :
              <span><v-label>Model:</v-label> {{ carListingItem.model }}</span>
            </div>
            <div
              class="text-sm flex items-start gap-1.5 px-2 py-1.5 border-b border-s"
            >
              <v-icon color="primary">mdi-gas-station-outline</v-icon>
              <span>{{ carListingItem.fuelType }}</span>
            </div>
            <div
              class="text-sm flex items-start gap-1.5 px-2 py-1.5 border-b border-s"
            >
              <v-icon color="primary">mdi-car-shift-pattern</v-icon>
              <v-label>Transmission:</v-label>
              <span>{{ carListingItem.transmission }}</span>
            </div>
            <div
              class="text-sm flex items-start gap-1.5 px-2 py-1.5 border-b border-s"
            >
              <v-icon color="primary">mdi-car-speed-limiter</v-icon>
              <v-label>Mileage:</v-label>
              <span>{{ carListingItem.mileage }} miles</span>
            </div>
            <div
              class="text-sm flex items-start gap-1.5 px-2 py-1.5 border-b border-s"
            >
              <v-icon color="primary">mdi-calendar-month</v-icon>
              <v-label>Year:</v-label>
              <span>{{ carListingItem.year }}</span>
            </div>
            <div
              class="text-sm flex items-start gap-1.5 px-2 py-1.5 border-b border-s"
            >
              <v-label>Color: </v-label>
              <span>{{ carListingItem.color }}</span>
            </div>
          </div>
          <div>
            <v-chip class="px-4">
              <div class="flex items-center gap-1 text-medium-emphasis">
                <span>
                  <v-label>price: </v-label>
                  <v-icon>mdi-currency-usd</v-icon>
                </span>
                <span class="font-extrabold text-lg">{{
                  carListingItem.price
                }}</span>
              </div>
            </v-chip>
          </div>
        </div>
      </v-tabs-window-item>
      <v-tabs-window-item value="gallery">
        <div>
          <div class="p-2">
            <Swiper
              free-mode
              mousewheel
              loop
              effect="cover-flow"
              ref="gallery-swiper"
              :modules="[
                Navigation,
                Pagination,
                FreeMode,
                Mousewheel,
                EffectCoverflow,
              ]"
              :slides-per-view="3"
              :space-between="20"
              :pagination="{ clickable: true }"
              :breakpoints="{
                0: { slidesPerView: 1 },
                320: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }"
            >
              <SwiperSlide v-for="i in 8" class="h-64">
                <v-img
                  class="h-full w-full"
                  rounded="lg"
                  cover
                  :src="`http://localhost:4002/cars/${carImages[i]}`"
                  lazy-src="/logo.png"
                ></v-img>
              </SwiperSlide>
              <template #container-end>
                <div style="z-index: 9999" class="p-2 flex gap-4">
                  <v-btn size="small" rounded="xl"
                    ><v-icon>mdi-chevron-left</v-icon></v-btn
                  >
                  <v-btn size="small" rounded="xl"
                    ><v-icon>mdi-chevron-right</v-icon></v-btn
                  >
                </div>
              </template>
            </Swiper>
          </div>
        </div>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
<script setup lang="ts">
import { carImages } from "@/lib/data";
import type { CarListing } from "@/lib/types";
import {
  EffectCoverflow,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const tab = ref<string | null>(null);

const swiper = useTemplateRef("gallery-swiper");

defineProps<{
  carListingItem: CarListing;
}>();
</script>
