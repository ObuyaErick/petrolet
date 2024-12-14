<template>
  <div class="flex items-center justify-between px-4 py-2">
    <div class="flex items-center">
      <v-icon :size="40" color="primary" icon="$vuetify"></v-icon>
      <span class="font-extrabold text-secondary text-lg">Petrolet</span>
    </div>
    <div class="flex items-center gap-3 text-sm">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about-us">About Us</RouterLink>
      <v-btn
        rounded="xl"
        size="small"
        prepend-icon="mdi-account-outline"
        color="primary"
        style="text-transform: none"
        >Sign In</v-btn
      >
    </div>
  </div>
</template>
<script setup lang="ts"></script>
