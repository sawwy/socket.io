import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {
    // implement node event listeners here
    // },
    baseUrl: "http://192.168.10.103:5173/",
  },
});
