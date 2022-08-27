<template>
  <MenuBar />
  <main>
    <ScoreBoard />
  </main>
  <FooterBar />
</template>

<script>
import { themeChange } from "theme-change";

import ScoreBoard from "./components/ScoreBoard.vue";
import MenuBar from "./components/MenuBar.vue";
import FooterBar from "./components/FooterBar.vue";

export default {
  components: {
    ScoreBoard,
    MenuBar,
    FooterBar,
  },
  mounted() {
    themeChange(false);

    if (localStorage.getItem("lang")) {
      this.$i18n.locale = localStorage.getItem("lang");
    } else {
      localStorage.setItem("lang", this.$i18n.locale);
    }
  },
  methods: {
    changeLang: function (lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
    },
  },
};
</script>
