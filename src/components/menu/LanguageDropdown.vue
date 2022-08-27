<template>
  <div :title="$t('change_language')" class="dropdown dropdown-end">
    <div tabindex="0" class="btn btn-ghost gap-1 normal-case">
      <TranslateIcon
        class="inline-block h-4 w-4 fill-current md:h-5 md:w-5"
      ></TranslateIcon>
      <ChevronDownIcon
        class="ml-1 hidden h-6 w-6 fill-current opacity-60 sm:inline-block"
      ></ChevronDownIcon>
    </div>
    <div
      class="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px mt-16 w-56 overflow-y-auto shadow-2xl"
    >
      <ul class="menu menu-compact gap-1 p-3" tabindex="0">
        <li>
          <button
            :class="['flex', $i18n.locale === 'en' ? 'active' : '']"
            @click="changeLang('en')"
          >
            <img
              loading="lazy"
              width="20"
              height="20"
              alt="English"
              src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg"
            />
            <span class="flex flex-1 justify-between">English</span>
          </button>
        </li>
        <li>
          <button
            :class="['flex', $i18n.locale === 'ms' ? 'active' : '']"
            @click="changeLang('ms')"
          >
            <img
              loading="lazy"
              width="20"
              height="20"
              alt="English"
              src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f2-1f1fe.svg"
            />
            <span class="flex flex-1 justify-between">Malay</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon, TranslateIcon } from "@heroicons/vue/solid";

export default {
  name: "LanguageDropdown",
  components: {
    ChevronDownIcon,
    TranslateIcon,
  },
  mounted() {
    const dropdownContent = document.querySelectorAll(".dropdown-content>ul");
    dropdownContent.forEach((element) => {
      element.addEventListener("click", () => {
        document.activeElement.blur();
      });
    });

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
