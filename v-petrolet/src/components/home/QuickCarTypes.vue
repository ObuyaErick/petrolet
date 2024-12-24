<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-2xl font-semibold">Browse By Type</h3>
      <v-btn
        append-icon="mdi-arrow-top-right"
        variant="text"
        rounded="xl"
        active-color="primary"
        style="text-transform: none"
        >View All</v-btn
      >
    </div>

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

    <!-- <div class="flex gap-2">
      <v-carousel cycle hide-delimiter-background :height="400">
        <v-carousel-item cover class="" v-for="t in filters.Makes.slice(0, 4)">
          <v-icon>mdi-truck-outline</v-icon>
          <span>{{ t }}</span>
        </v-carousel-item>
      </v-carousel>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { carImages, filters } from "@/lib/data";
import {
  EffectCoverflow,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
</script>
