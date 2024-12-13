<template>
  <div
    style="z-index: 9999"
    class="fixed bottom-4 w-full max-w-sm left-1/2 -translate-x-1/2 grid gap-2"
  >
    <transition name="slide" v-for="(alertObj, index) in alerts" :key="index">
      <v-alert
        rounded="lg"
        :type="alertObj.alert.status"
        closable
        @click:close="dismissAlert(alertObj.key)"
        variant="elevated"
      >
        <display-object class="text-sm" :data="alertObj.alert">
        </display-object>
      </v-alert>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from "@/stores/store.alerts";
import { computed } from "vue";

const alertStore = useAlertStore();

// Computed property to access alerts from the store
const alerts = computed(() => alertStore.alerts);

const dismissAlert = (key: string) => {
  alertStore.removeAlert(key);
};
</script>
