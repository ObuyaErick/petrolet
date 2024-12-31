<script setup lang="ts">
const links = {
  Company: [
    { title: "About Us", to: "" },
    { title: "Services", to: "" },
    { title: "FAQs", to: "" },
    { title: "Terms", to: "" },
    { title: "Contact Us", to: "" },
  ],
  "Quick Links": [
    { title: "Get in Touch", to: "" },
    { title: "Help Center", to: "" },
    { title: "Live chat", to: "" },
    { title: "How it works", to: "" },
  ],
  "Our Brands": [
    { title: "Toyota", to: "" },
    { title: "Porsche", to: "" },
    { title: "Audi", to: "" },
    { title: "BMW", to: "" },
    { title: "Ford", to: "" },
    { title: "Nissan", to: "" },
    { title: "Peugeot", to: "" },
    { title: "Volkswagen", to: "" },
  ],
  "Vehicle Types": [
    { title: "Sedan", to: "" },
    { title: "Hatchback", to: "" },
    { title: "SUV", to: "" },
    { title: "Hybrid", to: "" },
    { title: "Electric", to: "" },
    { title: "Coupe", to: "" },
    { title: "Truck", to: "" },
    { title: "Convertible", to: "" },
  ],
};
</script>

<template>
  <v-card color="surface-variant" class="rounded-0" elevation="0">
    <div class="container mx-auto px-3 py-6 grid grid-cols-5 gap-3 items-start">
      <div
        class="col-span-5 lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 items-start gap-3"
      >
        <div class="p-2 grid gap-1" :key="index" v-for="(v, k, index) in links">
          <v-label class="text-subtitle-1">{{ k }}</v-label>
          <div class="flex flex-col items-start">
            <v-btn
              variant="text"
              class="text-none"
              :key="idx"
              v-for="({ title }, idx) in v"
              >{{ title }}</v-btn
            >
          </div>
        </div>
      </div>
      <div
        class="grid col-span-5 lg:col-span-1 grid-cols-2 lg:grid-cols-1 gap-3 items-start"
      >
        <div class="p-2 grid gap-1">
          <v-label class="text-subtitle-1">Sale Hours</v-label>
          <div class="grid gap-1">
            <div class="flex gap-2">
              <v-label>Monday-Friday:</v-label>
              <span>09:00AM - 09:00PM</span>
            </div>
            <div class="flex gap-2">
              <v-label>Saturday:</v-label>
              <span>09:00AM - 07:00PM</span>
            </div>
            <div class="flex gap-2">
              <v-label>Sunday:</v-label>
              <span>Closed</span>
            </div>
          </div>
        </div>
        <div class="p-2 grid gap-1">
          <v-label class="text-subtitle-1">Connect With Us</v-label>
          <div class="flex gap-3">
            <v-btn size="small" variant="tonal" icon="mdi-facebook"></v-btn>
            <v-btn size="small" variant="tonal" icon="mdi-youtube"></v-btn>
            <v-btn size="small" variant="tonal" icon="mdi-twitter"></v-btn>
            <v-btn size="small" variant="tonal" icon="mdi-instagram"></v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t">
      <div
        class="container mx-auto px-3 py-6 flex justify-between flex-col sm:flex-row items-center gap-2"
      >
        <span
          >&copy; {{ new Date().getFullYear() }} petrolet.com. All rights
          reserved.</span
        >
        <div class="flex gap-3 items-center">
          <RouterLink to="/">Terms & Conditions</RouterLink>
          <span>•</span>
          <RouterLink to="/">Privacy Notice</RouterLink>
        </div>
      </div>
    </div>
  </v-card>
</template>
