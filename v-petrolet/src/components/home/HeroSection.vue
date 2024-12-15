<template>
  <div>
    <div class="">
      <div class="flex flex-col px-4 py-16 gap-4 items-center">
        <v-label>We make finding the right car simple</v-label>
        <h1 class="text-4xl md:text-5xl">Search Less. Live More.</h1>
        <p class="text-lg mb-6 max-w-lg z-40">
          Whether you're looking to buy or sell, our platform connects you with
          trusted dealers and buyers. Explore a wide range of cars at your
          fingertips, from family-friendly sedans to rugged off-road vehicles.
          Enjoy a seamless, secure experience backed by exclusive deals and
          transparent pricing. Start your journey now!
        </p>
        <div class="flex items-center gap-3">
          <v-btn
            size="large"
            color="primary"
            append-icon="mdi-arrow-top-right-thin"
            rounded="xl"
            style="text-transform: none"
            >View Inventory</v-btn
          >
          <v-btn
            size="large"
            append-icon="mdi-arrow-top-right-thin"
            rounded="xl"
            style="text-transform: none"
            >Contact Us</v-btn
          >
        </div>
        <div
          class="hidden border mt-3 rounded-full md:flex p-2 items-center gap-4 pl-4"
        >
          <div class="flex grow">
            <div
              class="flex items-center gap-2 px-2 text-secondary grow"
              :key="i"
              v-for="(values, filter, i) in filters"
            >
              <div>{{ filter }}</div>
              <v-menu>
                <template #activator="{ props }">
                  <v-btn
                    variant="text"
                    icon
                    size="small"
                    density="comfortable"
                    v-bind="props"
                  >
                    <v-icon size="small">mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list>
                    <v-list-item
                      v-for="item in values"
                      :title="item"
                    ></v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </div>

          <v-btn
            elevation="0"
            rounded="xl"
            color="primary"
            prepend-icon="mdi-magnify"
            >Search</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { filters } from "@/lib/data";
</script>
