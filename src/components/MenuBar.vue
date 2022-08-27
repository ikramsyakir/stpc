<template>
  <nav class="navbar w-full bg-base-100 shadow-xl">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">
        <h1 class="text-2xl font-logo tracking-wide">STPC</h1>
      </a>
    </div>
    <div>
      <ThemeDropdown />
      <LanguageDropdown />
      <GithubButton />
    </div>
  </nav>
</template>

<script>
import ThemeDropdown from "./menu/ThemeDropdown.vue";
import LanguageDropdown from "./menu/LanguageDropdown.vue";
import GithubButton from "./menu/GithubButton.vue";

export default {
  name: "MenuBar",
  components: {
    GithubButton,
    LanguageDropdown,
    ThemeDropdown,
  },
};
</script>
