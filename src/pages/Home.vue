<script setup lang="ts">
import { useServerSeoMeta } from "unhead";
import { RouterView } from "vue-router";

useServerSeoMeta({
  title: "Home",
  description: "My Home page",
  ogDescription: "Still Home my Home page",
  ogTitle: "Home",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image"
});
</script>

<template>
  <main>
    <div>Home Page</div>
    <div>{{ $route.params }}</div>
  </main>
  <router-view />
</template>
