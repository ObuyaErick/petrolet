<template>
  <v-form
    @submit.prevent="handleSubmit"
    class="flex flex-col w-full max-w-sm"
    v-model="valid"
    ref="form"
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
    <h3 class="text-xl mx-auto mb-2 text-center">
      Register with us now to access all our services
    </h3>

    <v-stepper-vertical variant="popout" color="primary">
      <template #default="{ next, prev, step }">
        <v-stepper-vertical-item
          class="shadow-sm shadow-black/10"
          elevation="0"
          :complete="Number(step) > 1"
          subtitle=""
          title="Personal details"
          :value="1"
          expand-icon="mdi-chevron-down"
          collapse-icon="mdi-chevron-up"
        >
          <v-text-field
            rounded="lg"
            density="comfortable"
            clearable
            label="First Name"
            class="mb-2"
            flat
            variant="solo-filled"
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
            class="mb-2"
            flat
            variant="solo-filled"
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
            density="comfortable"
            clearable
            label="Username"
            class="mb-2"
            flat
            variant="solo-filled"
            v-model="userDetails.username"
            prefix="@"
            :counter="75"
            :rules="[
              (v) => !!v || 'a username name is required',
              (v) =>
                authStore
                  .checkConflit('username', String(v))
                  .then((res) => !res.exists || 'username already taken'),
            ]"
          >
            <template #prepend-inner>
              <v-icon size="tiny">mdi-account-outline</v-icon>
            </template>
          </v-text-field>
          <template #icon>
            <v-icon>mdi-account-outline</v-icon>
          </template>
          <template #next>
            <v-btn
              @click="
                async () => {
                  const validation = await form?.validate();
                  if (validation?.valid) {
                    next();
                  }
                }
              "
              append-icon="mdi-arrow-right-thin"
            ></v-btn>
          </template>
          <template #prev></template>
        </v-stepper-vertical-item>
        <v-stepper-vertical-item
          class="shadow-sm shadow-black/10"
          elevation="0"
          :complete="Number(step) > 2"
          subtitle=""
          title="Contact details"
          :value="2"
          expand-icon="mdi-chevron-down"
          collapse-icon="mdi-chevron-up"
        >
          <v-text-field
            rounded="lg"
            type="email"
            density="comfortable"
            clearable
            label="Email Address"
            class="mb-2"
            flat
            variant="solo-filled"
            v-model="userDetails.email"
            :counter="75"
            :rules="[
              (v) => !!v || 'an email address is required',
              (v) =>
                authStore
                  .checkConflit('email', String(v))
                  .then((res) => !res.exists || 'email address already taken'),
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
            class="mb-2"
            flat
            variant="solo-filled"
            v-model="userDetails.phoneNumber"
            :counter="75"
            :rules="[
              (v) => !!v || 'phone number is required',
              (v) =>
                authStore
                  .checkConflit('phoneNumber', String(v))
                  .then((res) => !res.exists || 'phone number already taken'),
            ]"
          >
            <template #prepend-inner>
              <v-icon size="tiny">mdi-phone-dial</v-icon>
            </template>
          </v-text-field>
          <template #next>
            <v-btn
              @click="
                async () => {
                  const validation = await form?.validate();
                  if (validation?.valid) {
                    next();
                  }
                }
              "
              append-icon="mdi-arrow-right-thin"
            ></v-btn>
          </template>
          <template #prev>
            <v-btn @click="prev" prepend-icon="mdi-arrow-left-thin"></v-btn>
          </template>
          <template #icon>
            <v-icon>mdi-contacts-outline</v-icon>
          </template>
        </v-stepper-vertical-item>
        <v-stepper-vertical-item
          class="shadow-sm shadow-black/10"
          elevation="0"
          :complete="Number(step) > 3"
          subtitle=""
          title="Privacy and Security"
          :value="3"
          edit-icon=""
          expand-icon="mdi-chevron-down"
          collapse-icon="mdi-chevron-up"
        >
          <v-text-field
            :type="seePassword"
            density="comfortable"
            rounded="lg"
            clearable
            label="Password"
            class="mb-2"
            flat
            variant="solo-filled"
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
            class="mb-2"
            flat
            variant="solo-filled"
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
          <template #next>
            <v-btn
              type="submit"
              :loading="submitting"
              color="primary"
              variant="elevated"
              >Submit</v-btn
            >
          </template>
          <template #prev>
            <v-btn @click="prev" prepend-icon="mdi-arrow-left-thin"></v-btn>
          </template>
          <template #icon>
            <v-icon>mdi-shield-lock-outline</v-icon>
          </template>
        </v-stepper-vertical-item>
      </template>
    </v-stepper-vertical>

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
import { useAuthStore } from "@/stores/store.auth";
import axios from "axios";

const authStore = useAuthStore();
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
  // firstName: "",
  // lastName: "",
  // email: "",
  // phoneNumber: "",
  // password: "",
  // confirmPassword: "",

  firstName: "Erick",
  lastName: "Obuya",
  username: "ericks",
  email: "erickochieng766@gmail.com",
  phoneNumber: "254706087204",
  password: "Password123@",
  confirmPassword: "Password123@",
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
          username: userDetails.value.username,
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
