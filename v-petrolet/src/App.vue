<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useAuthStore } from "./stores/store.auth";

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.fetchCurrentUser();
});
</script>
