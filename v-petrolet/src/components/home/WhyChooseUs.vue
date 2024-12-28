<template>
  <div class="grid md:grid-cols-2 p-4 gap-y-8 gap-x-4">
    <div>
      <h3 class="text-2xl font-semibold capitalize">
        We&apos;re BIG on what matters to you
      </h3>
    </div>
    <div class="grid grid-cols- gap-4">
      <v-list-item
      nav
        class="bg-white rounded-xl p-4 border"
        :key="index"
        v-for="({ title, desc, icon }, index) in values"
      >
        <template #prepend>
          <v-icon :size="56">{{ icon }}</v-icon>
        </template>
        <v-list-item-title class="my-1">{{ title }}</v-list-item-title>
        <div class="text-secondary">{{ desc }}</div>
      </v-list-item>
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
