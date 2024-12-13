// stores/alertStore.ts
import { defineStore } from "pinia";
import { type AlertResponse } from "@/lib/types";
import { randomUuid } from "@/lib/utils";

export interface Alert {
  alert: AlertResponse;
  key: string;
  timeout: number;
}

export const useAlertStore = defineStore("alertStore", {
  state: () => ({
    alerts: [] as Alert[],
  }),
  actions: {
    pushAlert({
      alert,
      delayMs = 10000,
    }: {
      alert: AlertResponse;
      delayMs?: number;
    }) {
      const key = randomUuid();
      const timeout = setTimeout(() => {
        this.removeAlert(key);
      }, delayMs);
      this.alerts.push({ alert, timeout, key });
    },
    removeAlert(key: string) {
      const index = this.alerts.findIndex((a) => a.key === key);
      this.alerts.splice(index, 1);
    },
  },
});
