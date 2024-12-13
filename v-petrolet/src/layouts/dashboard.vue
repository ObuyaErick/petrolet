<template>
    <v-layout full-height>
      <left-navigation-drawer
        :is-open="!!drawer"
        v-model="drawer"
        @toggle-drawer="drawer = !drawer"
      ></left-navigation-drawer>
  
      <application-bar @toggle-drawer="drawer = !drawer"></application-bar>
  
      <bottom-navigation-bar v-if="$vuetify.display.xs"></bottom-navigation-bar>
  
      <v-main>
        <router-view />
      </v-main>
  
      <alerts-host></alerts-host>
    </v-layout>
  </template>
  
  <script lang="ts" setup>
  const drawer = ref(null);
  </script>