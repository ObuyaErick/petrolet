/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// Vuetify Color Pack
import colors from "vuetify/util/colors";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          background: "#f9fafb",
          primary: "#eab308", // colors.yellow.darken3,
          secondary: colors.grey.darken2,
          error: colors.red.darken1,
        },
      },
    },
  },
});
