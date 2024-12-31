<template>
  <div class="grid md:grid-cols-2 p-4 gap-y-8 gap-x-4">
    <div>
      <h3 class="text-2xl font-semibold capitalize">
        We&apos;re BIG on what matters to you
      </h3>
    </div>
    <div class="grid lg:grid-cols-2 gap-4">
      <div
        elevation="0"
        class="bg-white rounded-xl px-8 py-8 shadow-sm"
        :key="index"
        v-for="({ title, desc, icon }, index) in values"
      >
        <div class="flex items-center text-lg gap-3">
          <v-card class="pa-4" variant="tonal" rounded="circle" color="success">
            <v-icon :size="32">{{ icon }}</v-icon>
          </v-card>
          <h4 class="">
            {{ title }}
          </h4>
        </div>
        <div class="text-medium-emphasis text-lg">{{ desc }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const values = [
  {
    icon: "mdi-currency-usd",
    title: "Special Financing Offers",
    desc: "Get access to exclusive financing deals with low-interest rates and flexible payment terms.",
  },
  {
    icon: "mdi-shield-check-outline",
    title: "Trusted Car Dealership",
    desc: "We pride ourselves on being a dealership you can trust for quality vehicles and honest service.",
  },
  {
    icon: "mdi-cash-multiple",
    title: "Transparent Pricing",
    desc: "No hidden fees or surprises. Every car comes with a clear and upfront price tag.",
  },
  {
    icon: "mdi-wrench-outline",
    title: "Expert Car Service",
    desc: "Our certified technicians ensure your car gets the best care and maintenance.",
  },
];
</script>
