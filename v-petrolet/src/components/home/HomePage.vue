<template>
  <div>
    <div class="grid gap-6">
      <!-- Header Bar -->
      <header-bar class="container mx-auto"></header-bar>

      <!-- Hero Section -->
      <hero-section class="container mx-auto"></hero-section>

      <!-- Quick Car Types -->
      <quick-car-types class="container mx-auto"></quick-car-types>

      <!-- OFFSET -->
      <div class="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-y-6">
        <div class="p-2 grid grid-cols-2 gap-6">
          <div class="flex flex-col gap-6 items-end">
            <div class="grow w-[85%]">
              <v-img
                rounded="xl"
                cover
                class="h-full"
                :src="`http://localhost:4002/cars/${carImages[0]}`"
              ></v-img>
            </div>
            <div class="h-32 w-[75%]">
              <v-img
                rounded="xl"
                cover
                class="h-full"
                :src="`http://localhost:4002/cars/${carImages[1]}`"
              ></v-img>
            </div>
          </div>
          <div class="pr-6">
            <div class="h-80 mt-24">
              <v-img
                rounded="xl"
                cover
                class="h-full"
                :src="`http://localhost:4002/cars/${carImages[2]}`"
              ></v-img>
            </div>
          </div>
        </div>
        <div class="grid gap-3 max-w-lg mx-auto">
          <h3 class="text-2xl font-semibold capitalize">
            <span>Get a fair price for your car</span><br /><span
              >Sell to us today</span
            >
          </h3>
          <p>
            We are committed to providing our customer with exceptional service,
            competitive pricing, and a wide range of products.
          </p>
          <div class="my-6">
            <v-list-item class="ps-0">
              <template #prepend>
                <v-btn
                  class="me-2"
                  variant="tonal"
                  color="primary"
                  icon
                  size="small"
                  density="comfortable"
                  ><v-icon size="small">mdi-check</v-icon></v-btn
                >
              </template>
              <span
                >We are Kenya's largest provider, with more patrols in more
                places</span
              >
            </v-list-item>
            <v-list-item class="ps-0">
              <template #prepend>
                <v-btn
                  class="me-2"
                  variant="tonal"
                  color="primary"
                  icon
                  size="small"
                  density="comfortable"
                  ><v-icon size="small">mdi-check</v-icon></v-btn
                >
              </template>
              <span> You get 24/7 roadside assistance</span>
            </v-list-item>
            <v-list-item class="ps-0">
              <template #prepend>
                <v-btn
                  class="me-2"
                  variant="tonal"
                  color="primary"
                  icon
                  size="small"
                  density="comfortable"
                  ><v-icon size="small">mdi-check</v-icon></v-btn
                >
              </template>
              <span> We fix 4 out of 5 cars at the roadside</span>
            </v-list-item>
          </div>

          <div>
            <v-btn
              rounded="xl"
              size="large"
              style="text-transform: none"
              append-icon="mdi-arrow-top-right"
              color="primary"
              >Get Started</v-btn
            >
          </div>
        </div>
      </div>

      <div class="p-4 container mx-auto py-12">
        <v-card
          rounded="xl"
          variant="tonal"
          color="primary"
          class="text-warning"
        >
          <div class="grid lg:grid-cols-4">
            <div
              class="flex flex-col items-center gap-1 h-36 justify-center"
              v-for="(v, k, index) in dataPoints"
              :key="index"
            >
              <div class="text-xl font-semibold">{{ v }}</div>
              <div class="uppercase">{{ k }}</div>
            </div>
          </div>
        </v-card>
      </div>

      <div class="container mx-auto p-4">
        <div class="grid sm:grid-cols-2 gap-6">
          <v-card
            elevation="5"
            rounded="xl"
            :image="`http://localhost:4002/cars/${carImages[8]}`"
          >
            <v-card-text class="text-white pa-12 bg-black/50">
              <h3 class="capitalize text-xl font-semibold">
                Are you looking<br />
                for a car?
              </h3>
              <div class="text-lg my-6">
                We are committed to providing our customers with exceptional
                services.
              </div>
              <div>
                <v-btn
                  append-icon="mdi-arrow-top-right"
                  rounded="xl"
                  size="large"
                  variant="tonal"
                  style="text-transform: none"
                  >Start Exploring</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
          <v-card
            elevation="5"
            rounded="xl"
            :image="`http://localhost:4002/cars/${carImages[9]}`"
          >
            <v-card-text class="text-white pa-12 bg-black/50">
              <h3 class="capitalize text-xl font-semibold">
                Do you want to<br />
                sell a car?
              </h3>
              <div class="text-lg my-6">
                We are committed to providing our customers with exceptional
                services.
              </div>
              <div>
                <v-btn
                  append-icon="mdi-arrow-top-right"
                  rounded="xl"
                  size="large"
                  variant="tonal"
                  style="text-transform: none"
                  >Start Selling Now</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <div class="container mx-auto grid py-12">
        <div class="flex items-center justify-between px-4">
          <h3 class="text-2xl font-semibold">Explore All vehicles</h3>
          <v-btn
            append-icon="mdi-arrow-top-right"
            variant="text"
            rounded="xl"
            active-color="primary"
            style="text-transform: none"
            >View All</v-btn
          >
        </div>
        <div class="px-4">
          <v-tabs
            class="grow"
            density="compact"
            v-model="exploreTab"
            align-tabs="start"
            color="primary"
          >
            <v-tab text="Recent Cars" value="recent"></v-tab>
            <v-tab text="Featured Cars" value="featured"></v-tab>
            <v-tab text="Popular Cars" value="popular"></v-tab>
          </v-tabs>
        </div>
        <v-tabs-window v-model="exploreTab" class="pa-4">
          <v-tabs-window-item value="recent">
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <v-card
                elevation="5"
                density="comfortable"
                variant="elevated"
                class="relative"
                rounded="xl"
                :key="i"
                v-for="i in 4"
              >
                <div class="absolute z-50 top-4 inset-x-4 flex justify-between">
                  <div>
                    <v-btn
                      style="text-transform: none"
                      rounded="xl"
                      color="primary"
                      elevation="0"
                      density="comfortable"
                      >Great Price</v-btn
                    >
                  </div>
                  <v-btn icon size="small" density="comfortable">
                    <v-icon size="small">mdi-bookmark-outline</v-icon>
                  </v-btn>
                </div>
                <v-img
                  height="150"
                  cover
                  :src="`http://localhost:4002/cars/${carImages[9 + i]}`"
                ></v-img>
                <v-card-title>Toyota Camry New</v-card-title>
                <v-card-subtitle
                  >3.5 D5 PowerPulse Momentum 5dr AWD</v-card-subtitle
                >
                <v-card-text>
                  <div class="grid grid-cols-2 gap-2">
                    <div :key="i" v-for="i in 4">
                      <v-icon size="small" class="me-2">mdi-fuel</v-icon
                      ><span class="text-sm">Lorem Ipsum</span>
                    </div>
                  </div>
                  <div class="border-t flex items-center mt-2">
                    <v-chip variant="text" style="font-weight: bolder"
                      >$40,000</v-chip
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      style="text-transform: none"
                      size="small"
                      rounded="xl"
                      variant="text"
                      append-icon="mdi-arrow-top-right"
                      >View Details</v-btn
                    >
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>

      <why-choose-us class="container mx-auto"></why-choose-us>
    </div>
  </div>
</template>
<script setup lang="ts">
import { carImages } from "@/lib/data";

const exploreTab = ref(null);
const dataPoints = {
  "Cars for sale": "869M",
  "Dealer reviews": "738M",
  "Daily Visitors": "100M",
  "Verified Sellers": "238M",
};
</script>
