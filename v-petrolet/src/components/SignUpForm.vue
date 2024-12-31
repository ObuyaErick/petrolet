<template>
  <v-form
    @submit.prevent="handleSubmit"
    class="flex flex-col w-full max-w-sm"
    v-model="valid"
    ref="form"
  >
    <RouterLink class="mx-auto" to="/">
      <v-icon color="primary" icon="$vuetify" size="64"></v-icon>
    </RouterLink>
    <h1 class="text-2xl mx-auto">Welcome to Petrolet</h1>
    <h3 class="text-xl mx-auto mb-2">
      Register with us now to access all our services
    </h3>

    <v-text-field
      rounded="lg"
      density="comfortable"
      clearable
      label="First Name"
      variant="solo"
      v-model="userDetails.firstName"
      :counter="75"
      :rules="[(v) => !!v || 'a name is required']"
    >
      <template #prepend-inner>
        <v-icon size="tiny">mdi-account-outline</v-icon>
      </template>
    </v-text-field>

    <v-text-field
      rounded="lg"
      density="comfortable"
      clearable
      label="Last Name"
      variant="solo"
      v-model="userDetails.lastName"
      :counter="75"
      :rules="[(v) => !!v || 'a name is required']"
    >
      <template #prepend-inner>
        <v-icon size="tiny">mdi-account-outline</v-icon>
      </template>
    </v-text-field>

    <v-text-field
      rounded="lg"
      type="email"
      density="comfortable"
      clearable
      label="Email Address"
      variant="solo"
      v-model="userDetails.email"
      :counter="75"
      :rules="[
        (v) => !!v || 'an email address is required',
        // (v) => checkConflict('email', v + '', 'email address already taken'),
      ]"
    >
      <template #prepend-inner>
        <v-icon size="tiny">mdi-email-outline</v-icon>
      </template>
    </v-text-field>

    <v-text-field
      rounded="lg"
      density="comfortable"
      clearable
      label="Phone Number"
      variant="solo"
      v-model="userDetails.phoneNumber"
      :counter="75"
      :rules="[(v) => !!v || 'phone number is required']"
    >
      <template #prepend-inner>
        <v-icon size="tiny">mdi-ticket-confirmation-outline</v-icon>
      </template>
    </v-text-field>

    <v-text-field
      :type="seePassword"
      density="comfortable"
      rounded="lg"
      clearable
      label="Password"
      variant="solo"
      v-model="userDetails.password"
      :rules="[(v) => !!v || 'Please enter your password.']"
    >
      <template #prepend-inner>
        <v-icon size="tiny">mdi-lock-outline</v-icon>
      </template>
      <template #append-inner>
        <v-icon @click="toggleVisibility" size="tiny">{{
          visibilityIcon
        }}</v-icon>
      </template>
    </v-text-field>

    <v-text-field
      :type="seePassword"
      density="comfortable"
      rounded="lg"
      clearable
      label="Confirm Password"
      variant="solo"
      v-model="userDetails.confirmPassword"
      :rules="[
        (v) => !!v || 'Please enter your password.',
        (v) => v === userDetails.password || 'Passwords do not match.',
      ]"
    >
      <template #prepend-inner>
        <v-icon size="tiny">mdi-lock-outline</v-icon>
      </template>
      <template #append-inner>
        <v-icon @click="toggleVisibility" size="tiny">{{
          visibilityIcon
        }}</v-icon>
      </template>
    </v-text-field>

    <div class="mb-2 ms-2">
      <span class="text-xs"
        >Password strength: <em>{{ passwordStrength.desc }}</em
        ><span v-if="passwordStrength.strength">, </span
        ><em v-if="userDetails.password?.length < 8" class="text-error"
          >too short</em
        ></span
      >
      <div class="">
        <v-progress-linear
          rounded="lg"
          rounded-bar
          :color="strengthColor"
          :model-value="passwordStrength.strength"
          :max="5"
        ></v-progress-linear>
      </div>
    </div>

    <v-btn
      type="submit"
      :loading="submitting"
      size="large"
      rounded="lg"
      color="primary"
      block
      >Submit</v-btn
    >

    <p class="self-center mt-4 text-sm">
      Have an account?
      <RouterLink class="text-primary" to="sign-in">Sign In</RouterLink>.
    </p>
  </v-form>
</template>
<script setup lang="ts">
import useAPI from "@/composables/useAPI";
import { ApiBuilder } from "@/lib/APIS";
import type { UserRegistrationForm } from "@/lib/types";
import { gradePassword } from "@/lib/utils";
import { useAlertStore } from "@/stores/store.alerts";
import axios from "axios";

const { pushAlert } = useAlertStore();
const passwordStrengthColors: Record<string, string> = {
  "0": "secondary",
  "1": "error",
  "2": "error",
  "3": "warning",
  "4": "info",
  "5": "success",
};

const handleRequest = useAPI();

const seePassword = ref("password");
const form = useTemplateRef("form");

const toggleVisibility = () =>
  (seePassword.value = seePassword.value === "password" ? "text" : "password");

const visibilityIcon = computed(() =>
  seePassword.value === "password" ? "mdi-eye-outline" : "mdi-eye-off-outline"
);

const valid = ref(false);

const submitting = ref(false);

const userDetails = ref<UserRegistrationForm>({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
});

const passwordStrength = computed(() => {
  const grade = gradePassword(userDetails.value.password);
  if (grade.strength === 4 && userDetails.value.password.length >= 8) {
    grade.strength = 5;
  }
  return grade;
});

const strengthColor = computed(
  () => passwordStrengthColors[`${passwordStrength.value.strength}`]
);

const handleSubmit = async () => {
  if (valid.value) {
    const res = await handleRequest<{ detail: string }>({
      func: axios.post,
      args: [
        ApiBuilder.getInstance("AUTH-SIGN-UP").build(),
        {
          firstName: userDetails.value.firstName,
          lastName: userDetails.value.lastName,
          email: userDetails.value.email,
          phoneNumber: userDetails.value.phoneNumber,
          password: userDetails.value.password,
          confirmPassword: userDetails.value.confirmPassword,
        },
      ],
    });

    if (res.status === "ok") {
      form.value?.reset();
      pushAlert({
        alert: {
          status: "success",
          message: res.result.detail || "Registration successful.",
        },
      });
    } else {
      pushAlert({
        alert: {
          status: "error",
          message:
            res.errors?.detail || "Sorry! An error occured while signing up.",
        },
      });
    }
  }
};
</script>
<style lang=""></style>
