<template>
  <v-navigation-drawer
    :class="{
      'full-width-drawer': isOpen && $vuetify.display.xs,
    }"
    @click="emit('toggle-drawer')"
  >
    <div class="flex h-full">
      <div class="flex flex-col">
        <div class="p-3">
          <v-icon color="primary" icon="$vuetify" size="30"></v-icon>
        </div>

        <div class="py-1 grid">
          <v-tooltip
            :offset="1"
            v-for="(item, index) in Object.keys(navItems.dynamic)"
            :key="index"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                class="m-1"
                @click="tab = item"
                :icon="navItems.dynamic[item]?.icon"
                :value="item"
                :color="tab === item ? 'primary' : undefined"
                variant="text"
              >
              </v-btn>
            </template>

            <span>{{ item }}</span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer>
        <div class="flex items-center justify-center p-2">
          <v-avatar
            size="small"
            image="https://randomuser.me/api/portraits/women/81.jpg"
          ></v-avatar>
        </div>
      </div>

      <div class="border-s grow flex flex-col">
        <v-list density="compact" nav>
          <v-list-item key="active-tab">
            <v-list-item-title class="flex items-center"
              ><span class="uppercase font-semibold text-primary">{{
                tab
              }}</span
              ><v-spacer> </v-spacer>
              <v-btn
                v-if="$vuetify.display.xs"
                @click.stop="emit('toggle-drawer')"
                variant="tonal"
                density="comfortable"
                class="border"
                rounded="xl"
                color="primary"
                icon="mdi-close"
                size="small"
              ></v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="({ title, icon }, index) in navItems.dynamic[tab]?.sub"
            :key="index"
            :prepend-icon="icon"
            :title="title"
            :value="title"
            color="primary"
          ></v-list-item>
        </v-list>

        <v-spacer></v-spacer>

        <v-list class="border-t" nav density="compact">
          <v-list-item
            v-for="({ title, icon }, index) in navItems.static"
            :key="index"
            :title="title"
            :value="title"
            color="primary"
            :prepend-icon="icon"
          >
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { navItems } from "./nav-items";

const tab = ref("Account");

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle-drawer"): void;
  (e: "sign-out"): void;
}>();
</script>
<style lang="css" scoped>
.full-width-drawer {
  width: 100% !important;
}
</style>
