<template>
  <v-app>
    <template v-if="authStore.loggedIn" full-height>
      <left-navigation-drawer></left-navigation-drawer>

      <application-bar></application-bar>

      <bottom-navigation-bar v-if="$vuetify.display.xs"></bottom-navigation-bar>

      <v-main>
        <router-view />
      </v-main>
    </template>
    <template v-else>
      <div
        class="h-full min-h-screen w-full flex items-center justify-center p-4"
      >
        <sign-in-form />
      </div>
    </template>

    <alerts-host />
  </v-app>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/store.auth";
const authStore = useAuthStore();
</script>
