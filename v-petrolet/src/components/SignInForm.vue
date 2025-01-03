<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      validate-on="input lazy"
      @submit.prevent="handleSubmit"
      class="flex flex-col w-full min-w-[20rem] max-w-sm"
    >
      <RouterLink class="mx-auto" to="/">
        <v-icon
          size="large"
          color="primary"
          v-for="(l, i) in 'petrolet'"
          :key="i"
          >{{ `mdi-alpha-${l}-box` }}</v-icon
        >
        <!-- <v-avatar size="128" image="/logo.png"></v-avatar> -->
      </RouterLink>
      <h1 class="text-2xl mx-auto">Welcome back!</h1>
      <h3 class="text-xl mx-auto">Log into your account</h3>

      <v-text-field
        density="comfortable"
        rounded="lg"
        class="mt-2"
        color="primary"
        clearable
        label="Username or Email"
        flat
        variant="solo"
        v-model="identity"
        :counter="75"
        :rules="[(v) => !!v || 'This field is required.']"
      >
        <template #prepend-inner>
          <v-icon size="tiny">mdi-account-outline</v-icon>
        </template>
      </v-text-field>

      <v-text-field
        :type="seePassword"
        density="comfortable"
        rounded="lg"
        class="mt-2"
        color="primary"
        clearable
        label="Password"
        flat
        variant="solo"
        v-model="password"
        :rules="[(v) => !!v || 'Please enter your password.']"
      >
        <template #prepend-inner>
          <v-icon size="tiny">mdi-lock-outline</v-icon>
        </template>
        <template #append-inner>
          <v-icon size="small" @click="toggleVisibility">{{
            visibilityIcon
          }}</v-icon>
        </template>
      </v-text-field>

      <div class="flex justify-end items-center">
        <RouterLink class="text-primary" to="/request-password-reset"
          >Forgot password?</RouterLink
        >
      </div>

      <v-btn
        :loading="submitting"
        class="mt-2"
        color="primary"
        variant="elevated"
        rounded="lg"
        type="submit"
      >
        Sign in
      </v-btn>

      <p class="self-center mt-4 text-sm">
        Not yet registered?
        <RouterLink class="text-primary" to="sign-up">Sign up here</RouterLink>.
      </p>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from "@/stores/store.alerts";
import { useAuthStore } from "@/stores/store.auth";

const authStore = useAuthStore();
const { pushAlert } = useAlertStore();

const valid = ref(false);
const identity = ref("");
const password = ref("");
const submitting = ref(false);
const seePassword = ref("password");
const form = useTemplateRef("form");

const toggleVisibility = () =>
  (seePassword.value = seePassword.value === "password" ? "text" : "password");

const visibilityIcon = computed(() =>
  seePassword.value === "password" ? "mdi-eye-outline" : "mdi-eye-off-outline"
);

const handleSubmit = async () => {
  if (valid.value) {
    // Validation passed
    submitting.value = true;
    authStore
      .login({
        identity: identity.value,
        password: password.value,
      })
      .then((res) => {
        pushAlert({ alert: res });

        // Clear form on success
        if (res.status === "success") {
          form.value?.reset();
          emit("success");
        }
      })
      .finally(() => {
        submitting.value = false;
      });
  }
};

const emit = defineEmits<{
  (e: "success"): void;
}>();
</script>
