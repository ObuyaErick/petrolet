/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "radial-gradient-at-t":
          "radial-gradient(circle at top, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
