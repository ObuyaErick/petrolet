/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify labs
import { VCalendar } from "vuetify/labs/VCalendar";
import {
  VStepperVertical,
  VStepperVerticalItem,
  VStepperVerticalActions,
} from "vuetify/labs/VStepperVertical";

// Composables
import { createVuetify } from "vuetify";

// Vuetify Color Pack
import colors from "vuetify/util/colors";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VCalendar,
    VStepperVertical,
    VStepperVerticalItem,
    VStepperVerticalActions,
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          background: "#f9fafb",
          primary: colors.deepOrange.lighten1, // "#eab308", // colors.yellow.darken3,
          secondary: colors.grey.darken2,
          error: colors.red.darken1,
        },
      },
    },
  },
});
