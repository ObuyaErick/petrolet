import type {
  AlertResponse,
  AuthenticationContext,
  LoginForm,
  ResetPasswordForm,
} from "@/lib/types";
import useAPI from "@/composables/useAPI";
import { defineStore } from "pinia";
import axios from "axios";
import { ApiBuilder } from "@/lib/APIS";
const handleRequest = useAPI();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: null as AuthenticationContext | null,
  }),
  getters: {
    loggedIn(state) {
      return !!state.auth;
    },
    principal(state) {
      return state.auth?.principal;
    },
    initials(state) {
      return state.auth?.initials;
    },
    isAdmin(state) {
      return state.auth?.authorities.some((a) => a.name === "ROLE_ADMIN");
    },
    authorities(state) {
      return state.auth?.authorities;
    },
  },
  actions: {
    clear() {
      this.auth = null;
    },
    async login(payload: LoginForm): Promise<AlertResponse> {
      return await handleRequest<any>({
        func: axios.post,
        args: [ApiBuilder.getInstance("AUTH-SIGN-IN").build(), payload],
      }).then(async (res) => {
        if (res.status === "ok") {
          // Fetch the details of the just logged in user
          await this.fetchCurrentUser();
          return {
            status: "success",
            message: "Signed in successfully.",
          };
        }
        return {
          status: "error",
          message: res.errors.message || "Could not sign in.",
        };
      });
    },
    async fetchCurrentUser() {
      await handleRequest<AuthenticationContext>({
        func: axios.get,
        args: [ApiBuilder.getInstance("AUTH-CURRENT-USER").build()],
      }).then((data) => {
        if (data.status === "ok" && data.result) {
          this.auth = data.result;
        } else {
          this.clear();
        }
      });
    },
    async signout(): Promise<AlertResponse> {
      return await handleRequest({
        func: axios.post,
        args: [ApiBuilder.getInstance("AUTH-SIGN-OUT").build()],
      }).then((res) => {
        this.clear();
        if (res.status === "ok") {
          return {
            status: "success",
            message: "Signed out successfully.",
          };
        }
        return {
          status: "error",
          message: res.errors.message || "Could not sign out.",
        };
      });
    },
    async requestPasswordReset(identity: string): Promise<AlertResponse> {
      return await handleRequest<{ message: string }>({
        func: axios.post,
        args: [
          ApiBuilder.getInstance("AUTH-REQUEST-PASSWORD-RESET").build(),
          { identity },
        ],
      }).then((res) => {
        if (res.status === "ok") {
          this.clear();
          return {
            status: "success",
            message:
              res.result?.message ||
              "Please follow the instructions sent to your email to reset your password.",
          };
        }
        return {
          status: "error",
          message:
            res.errors.message ||
            "Could not satisfy your request. Please  try again later.",
        };
      });
    },
    async resetPassword(payload: ResetPasswordForm): Promise<AlertResponse> {
      return await handleRequest<{ message: string }>({
        func: axios.post,
        args: [ApiBuilder.getInstance("AUTH-RESET-PASSWORD").build(), payload],
      }).then((res) => {
        if (res.status === "ok") {
          this.clear();
          return {
            status: "success",
            message:
              res.result?.message ||
              "You have successfully reset your password.",
          };
        }
        return {
          status: "error",
          message:
            res.errors.message ||
            "Could not satisfy your request. Please  try again later.",
        };
      });
    },
  },
});
