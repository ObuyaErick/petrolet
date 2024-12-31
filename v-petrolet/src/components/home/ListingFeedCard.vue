<script lang="ts" setup>
import type { CarListing } from "@/lib/types";

defineProps<{
  listing: CarListing;
}>();
</script>
<template>
  <v-card density="comfortable" variant="text">
    <v-img
      height="250"
      cover
      rounded="lg"
      class="ma-4"
      src="/cars/garvin-st-villier.jpg"
    ></v-img>
    <v-card-title>{{ listing.title }}</v-card-title>

    <v-card-text>
      <div class="text-body-2 text-medium-emphasis pb-2">
        {{ listing.description }}
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="">
          <v-icon size="small" class="me-2">mdi-fuel</v-icon
          ><span class="text-sm">{{ listing.make }}</span>
        </div>
        <div class="">
          <v-icon size="small" class="me-2">mdi-fuel</v-icon
          ><span class="text-sm">{{ listing.model }}</span>
        </div>
        <div class="">
          <v-icon size="small" class="me-2">mdi-fuel</v-icon
          ><span class="text-sm">{{ listing.fuelType }}</span>
        </div>
        <div class="">
          <v-icon size="small" class="me-2">mdi-fuel</v-icon
          ><span class="text-sm">{{ listing.condition }}</span>
        </div>
      </div>
      <div class="border-t flex items-center mt-2 pt-2">
        <v-chip variant="text" style="font-weight: bolder"
          >${{ listing.price }}</v-chip
        >
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="text"
          append-icon="mdi-arrow-top-right"
          class="text-none"
          >See More</v-btn
        >
      </div>
    </v-card-text>
  </v-card>
</template>
