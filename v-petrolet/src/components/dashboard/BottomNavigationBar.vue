<template>
  <v-bottom-navigation horizontal :elevation="0" grow color="primary">
    <v-btn
      :key="index"
      v-for="(tab, index) in Object.keys(navItems.dynamic)"
      :value="tab"
    >
      <v-icon>{{ navItems.dynamic[tab].icon }}</v-icon>

      <span>{{ tab }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>
<script setup lang="ts">
import { navItems } from "./nav-items";
</script>
