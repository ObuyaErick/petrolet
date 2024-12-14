<template>
  <div class="grid md:grid-cols-2 p-4 gap-y-8 gap-x-4">
    <div>
      <h3 class="text-2xl font-semibold capitalize">
        We&apos;re BIG on what matters to you
      </h3>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div
        class="bg-white rounded-xl p-4 border"
        :key="index"
        v-for="({ title, desc, icon }, index) in values"
      >
        <div>
          <v-icon>{{ icon }}</v-icon>
        </div>
        <h4>{{ title }}</h4>
        <div>{{ desc }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const values = [
  {
    icon: "",
    title: "Special Financing Offers",
    desc: "",
  },
  {
    icon: "",
    title: "Trusted Car Dealership",
    desc: "",
  },
  {
    icon: "",
    title: "Transparent Pricing",
    desc: "",
  },
  {
    icon: "",
    title: "Expert Car Service",
    desc: "",
  },
];
</script>
