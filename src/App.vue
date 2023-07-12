<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useHead } from "unhead";
import Trans from "./i18n/translation";
import { SITE_NAME } from "@/utils/constants";

import Logo from "@/assets/logo.svg";

const route = useRoute();
useHead({
  htmlAttrs: {
    lang: Trans.currentLocale
  },
  meta: [
    {
      name: "og:site_name",
      content: SITE_NAME
    }
  ],
  link: [
    {
      rel: "canonical",
      href: `${import.meta.env.VITE_DOMAIN}${route.path}`
    }
  ]
});
</script>

<template>
  <header>
    <nav>
      <img alt="Vue logo" class="logo" :src="Logo" width="125" height="125" />
      <RouterLink :to="$i18nRoute({ name: 'home' })">{{ $t("nav.home") }}</RouterLink>
      <RouterLink :to="$i18nRoute({ name: 'about' })">{{ $t("nav.about") }}</RouterLink>

      <LanguageSwitcher />
    </nav>
  </header>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  width: 2rem;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
