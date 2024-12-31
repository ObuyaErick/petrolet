<template>
  <div>
    <div class="grid gap-6">
      <div class="relative">
        <ferrari-car class="absolute inset-0 z-10"></ferrari-car>

        <!-- Hero Section -->
        <hero-section class="container mx-auto"></hero-section>
      </div>

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
                src="/cars/garvin-st-villier.jpg"
              ></v-img>
            </div>
            <div class="h-32 w-[75%]">
              <v-img
                rounded="xl"
                cover
                class="h-full"
                src="/cars/garvin-st-villier.jpg"
              ></v-img>
            </div>
          </div>
          <div class="pr-6">
            <div class="h-80 mt-24">
              <v-img
                rounded="xl"
                cover
                class="h-full"
                src="/cars/garvin-st-villier.jpg"
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
              append-icon="mdi-arrow-top-right"
              color="primary"
              class="text-none"
              >Get Started</v-btn
            >
          </div>
        </div>
      </div>

      <!-- <div class="p-4 container mx-auto py-12">
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
      </div> -->

      <div class="container mx-auto p-4">
        <div class="grid md:grid-cols-2 gap-6">
          <v-card elevation="0" rounded="xl">
            <v-card-text class="pa-12">
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
                  color="primary"
                  class="text-none"
                  >Start Exploring</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
          <v-card elevation="0" rounded="xl">
            <v-card-text class="pa-12">
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
                  color="success"
                  class="text-none"
                  >Start Selling Now</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <listings-feed class="container mx-auto" />

      <why-choose-us class="container mx-auto" />

      <faq class="container mx-auto"></faq>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="css" scoped></style>
