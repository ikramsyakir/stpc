import { createApp } from "vue";

import App from "./App.vue";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "/src/assets/css/main.css";

import { createI18n } from "vue-i18n";
import en from "./lang/en.json";
import ms from "./lang/ms.json";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    ms,
  },
});

const app = createApp(App);

app.use(VueSweetalert2);
app.use(i18n);

app.mount("#app");
