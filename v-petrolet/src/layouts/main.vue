<template>
    <v-app>
      <!-- Header Bar -->
      <header-bar class="container mx-auto"></header-bar>
  
      <v-main>
        <router-view />
      </v-main>
  
      <!-- Footer -->
      <p-footer></p-footer>
    </v-app>
  </template>
  
  <script lang="ts" setup></script>