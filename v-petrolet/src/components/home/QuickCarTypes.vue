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
            src="/cars/garvin-st-villier.jpg"
            lazy-src="/logo.png"
          ></v-img>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { carImages } from "@/lib/data";
import {
  EffectCoverflow,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
</script>
