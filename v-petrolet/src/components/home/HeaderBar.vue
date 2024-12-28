<template>
  <div class="flex items-center justify-between px-4 py-2">
    <div class="flex items-center">
      <v-icon :size="40" color="primary" icon="$vuetify"></v-icon>
      <span class="font-extrabold text-secondary text-lg">Petrolet</span>
    </div>

    <div v-if="$vuetify.display.mdAndUp" class="flex items-center gap-3 text-sm">
      <v-btn class="" variant="text" :key="index" v-for="(navItem, index) in navItems">{{
        navItem
      }}</v-btn>
      <v-btn rounded="xl" prepend-icon="mdi-account-outline" color="primary"
        >Sign In</v-btn
      >
    </div>
    <div v-else>
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
        </template>
        <v-card class="" elevation="1">
          <v-card-text class="grid pa-2">
            <v-btn
              variant="text"
              :key="index"
              v-for="(navItem, index) in navItems"
              >{{ navItem }}</v-btn
            >
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
const navItems = ref(["Home", "Inventory", "Explore", "Contact", "About"]);
</script>
