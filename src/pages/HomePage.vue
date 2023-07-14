<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { useServerSeoMeta } from "unhead";
import { useOnClickOutside } from "@/composables/useOnClickOutside";

useServerSeoMeta({
  title: "Home",
  description: "My Home page",
  ogDescription: "Still Home my Home page",
  ogTitle: "Home",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image"
});

const square = ref<HTMLDivElement | null>(null);

const isClikedSquare = ref(false);

useOnClickOutside(square, () => {
  isClikedSquare.value = false;
});
</script>

<template>
  <main>
    <div>Home Page</div>
    <div>{{ $route.params }}</div>
  </main>
  <div ref="square" class="square" @click="isClikedSquare = true">
    <span v-if="isClikedSquare">Click Inside</span>
    <span v-else>Click Outside</span>
  </div>
  <router-view />
</template>

<style lang="css">
.square {
  width: 200px;
  height: 100px;
  margin: 0 auto;
  background-color: aquamarine;
}
</style>
