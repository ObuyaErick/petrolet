<template>
  <v-app-bar name="app-bar" elevation="0" class="border-b">
    <template v-if="$vuetify.display.mobile" #prepend>
      <div class="p-3">
        <v-icon
          @click="dashboardStore.toggleDrawer"
          color="primary"
          icon="$vuetify"
          size="30"
        ></v-icon>
      </div>
    </template>

    <template v-if="$vuetify.display.mobile" #append>
      <v-app-bar-nav-icon
        @click="dashboardStore.toggleDrawer"
        height="36"
        width="36"
        rounded="lg"
        icon="mdi-menu-open"
      ></v-app-bar-nav-icon>
    </template>

    <div>
      <v-btn block class="border text-none ms-3" prepend-icon="mdi-magnify"
        >Search Ctrl K</v-btn
      >
    </div>

    <v-spacer></v-spacer>

    <v-menu>
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          density="comfortable"
          size="small"
          class="me-2"
          variant="plain"
          icon="mdi-bell-outline"
        ></v-btn>
      </template>
      <v-card>
        <v-card-title
          >Notifications
          <v-btn color="secondary" variant="text" class="ms-4"
            >view all</v-btn
          ></v-card-title
        >
        <v-card-text class="border-t">
          <div class="flex flex-col gap-2 items-center justify-center py-4">
            <v-icon size="36" color="secondary">mdi-gauge-empty</v-icon>
            <v-label>No notifications yet</v-label>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>

    <v-menu>
      <template #activator="{ props }">
        <div class="me-2">
          <v-btn v-bind="props" class="" icon density="comfortable">
            <v-avatar
              size="small"
              image="https://randomuser.me/api/portraits/women/81.jpg"
            ></v-avatar>
          </v-btn>
          <v-btn
            v-bind="props"
            icon="mdi-chevron-down"
            density="compact"
            size="small"
            class="ms-1"
          ></v-btn>
        </div>
      </template>

      <v-card rounded="lg" elevation="8">
        <template #title>
          <v-list-item
            :title="`${authStore.initials?.firstName} ${authStore.initials?.lastName}`"
            :subtitle="authStore.principal?.email"
          >
            <template #prepend>
              <v-avatar
                size="small"
                image="https://randomuser.me/api/portraits/women/81.jpg"
              ></v-avatar>
            </template>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-account-details-outline"
            subtitle="View Profile"
            value="/dashboard/account/profile"
            to="/dashboard/account"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-creation-outline"
            subtitle="Constitution"
            value="constitution"
            class="mb-2"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item
            class="mt-2"
            @click="authStore.signout"
            prepend-icon="mdi-logout"
            subtitle="Logout"
            value="logout"
          ></v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/store.auth";
import { useDashboardStore } from "@/stores/store.dashboard";

const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
</script>
