<template>
  <v-navigation-drawer
    :class="{
      'full-width-drawer': dashboardStore.drawer && $vuetify.display.xs,
    }"
    @click="dashboardStore.toggleDrawer"
    :model-value="$vuetify.display.mobile ? dashboardStore.drawer : true"
    @update:model-value="dashboardStore.toggleDrawer"
  >
    <div class="flex h-full">
      <div class="flex flex-col">
        <div class="">
          <v-avatar class="m-1 pa-0" image="/logo.png" size="48"></v-avatar>
        </div>

        <div class="py-1 grid">
          <v-tooltip :offset="1">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                class="m-1"
                @click="tab = 'Analytics'"
                icon="mdi-chart-box-multiple-outline"
                value="analytics"
                variant="text"
                to="/dashboard"
              >
              </v-btn>
            </template>

            <span>Analytics</span>
          </v-tooltip>

          <v-tooltip :offset="1">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                class="m-1"
                @click="tab = 'Account'"
                icon="mdi-account-circle-outline"
                value="account"
                variant="text"
                to="/dashboard/account"
              >
              </v-btn>
            </template>

            <span>Account</span>
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
                @click.stop="dashboardStore.toggleDrawer"
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

          <!-- Sub Nav Items -->
          <template v-if="tab === 'Analytics'">
            <v-list-item
              prepend-icon="mdi-account-outline"
              title="Profile"
              value="profile"
              color="primary"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-cog-outline"
              title="Sales"
              value="sales"
              color="primary"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-lock-reset"
              title="Site"
              value="site"
              color="primary"
            ></v-list-item>
          </template>
          <template v-else-if="tab === 'Account'">
            <v-list-item
              prepend-icon="mdi-account-outline"
              title="Profile"
              value="profile"
              color="primary"
              to="/dashboard/account/profile"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-cog-outline"
              title="Settings"
              value="settings"
              color="primary"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-lock-reset"
              title="Password Change"
              value="password-change"
              color="primary"
            ></v-list-item>
          </template>
        </v-list>

        <v-spacer></v-spacer>

        <v-list class="border-t" nav density="compact">
          <v-list-item
            prepend-icon="mdi-bell-outline"
            title="Notifications"
            value="notifications"
            color="primary"
            to="/dashboard/notifications"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-help-circle-outline"
            title="Support"
            value="support"
            color="primary"
            to="/dashboard/support"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-lock-reset"
            title="Log out"
            value="logout"
            color="primary"
          ></v-list-item>
        </v-list>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { useDashboardStore } from "@/stores/store.dashboard";

const dashboardStore = useDashboardStore();

const tab = ref<"Analytics" | "Account">("Analytics");
</script>
<style lang="css" scoped>
.full-width-drawer {
  width: 100% !important;
}
</style>
