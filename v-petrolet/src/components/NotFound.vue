<template>
  <v-empty-state class="" headline="Whoops, 404" image="/logo.png">
    <template #title>
      <div class="uppercase">Page not found</div>
    </template>
    <template #text>
      <div class="max-w-sm text-body-2 text-high-emphasis py-2">
        But if you don't change your direction, and if you keep looking, you may
        end up where you are heading.
      </div>
    </template>
    <template #actions>
      <v-btn
        @click="$router.back()"
        color="surface"
        class="text-none"
        prepend-icon="mdi-arrow-left-thin"
        >Go Back</v-btn
      >
      <slot name="go-home">
        <v-btn
          to="/"
          color="primary"
          class="text-none"
          prepend-icon="mdi-home-outline"
          >Take Me Home</v-btn
        >
      </slot>
    </template>
  </v-empty-state>
</template>
<script lang="ts" setup></script>
