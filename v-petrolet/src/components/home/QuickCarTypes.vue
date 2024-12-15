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

    <div class="flex gap-2">
      <v-carousel cycle hide-delimiter-background :height="400">
        <v-carousel-item cover class="" v-for="t in filters.Makes.slice(0, 4)">
          <v-icon>mdi-truck-outline</v-icon>
          <span>{{ t }}</span>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>
<script setup lang="ts">
import { filters } from "@/lib/data";
</script>
