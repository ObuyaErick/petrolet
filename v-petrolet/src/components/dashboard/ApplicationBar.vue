<template>
  <v-app-bar name="app-bar" elevation="0" class="border-b">
    <template v-if="$vuetify.display.mobile" #prepend>
      <div class="p-3">
        <v-icon
          @click="emit('toggle-drawer')"
          color="primary"
          icon="$vuetify"
          size="30"
        ></v-icon>
      </div>
    </template>

    <template v-if="$vuetify.display.mobile" #append>
      <v-app-bar-nav-icon
        @click="emit('toggle-drawer')"
        height="36"
        width="36"
        rounded="lg"
      ></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <v-text-field density="comfortable" placeholder="Search" variant="plain">
        <template #prepend>
          <div class="h-full"><v-icon size="small">mdi-magnify</v-icon></div>
        </template>
      </v-text-field>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-menu>
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          density="comfortable"
          size="small"
          class="me-2"
          variant="tonal"
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
        <div v-bind="props" class="me-2">
          <v-avatar
            size="small"
            image="https://randomuser.me/api/portraits/women/81.jpg"
          ></v-avatar>
          <!-- <v-avatar
            size="small"
            image="http://localhost:4000/erick.jpg"
          ></v-avatar> -->
          <v-icon size="small" class="ms-1">mdi-chevron-down</v-icon>
        </div>
      </template>

      <v-card rounded="lg" elevation="8">
        <template #title>
          <v-list-item title="Joe Munyi" subtitle="joemunyi@yahoo.com">
            <template #prepend>
              <v-avatar
                size="small"
                image="https://randomuser.me/api/portraits/women/81.jpg"
              ></v-avatar>
              <!-- <v-avatar image="http://localhost:4000/erick.jpg"></v-avatar> -->
            </template>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-account-details-outline"
            subtitle="View Profile"
            value="profile"
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
            @click="emit('sign-out')"
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
const emit = defineEmits<{
  (e: "toggle-drawer"): void;
  (e: "sign-out"): void;
}>();
</script>
