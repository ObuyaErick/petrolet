<template>
  <div>
    <div class="flex-grow" v-if="flatTypes.includes(typeof data.message)">
      {{ data.message }}
    </div>

    <!-- If type of steps is array -->
    <div class="flex-grow" v-if="Array.isArray(data.message)">
      <div v-for="(el, index) in data.message" :key="index">
        {{ el }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AlertResponse } from "@/lib/types";
import { defineProps } from "vue";

const flatTypes = [
  "string",
  "number",
  "undefined",
  "symbol",
  "boolean",
  "bigint",
];

defineProps<{
  data: AlertResponse;
}>();
</script>

<style scoped></style>
