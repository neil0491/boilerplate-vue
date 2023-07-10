<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { useServerSeoMeta } from "unhead";
import { onServerPrefetch } from "vue";

useServerSeoMeta({
  title: "About",
  description: "My about page",
  ogDescription: "Still about my about page",
  ogTitle: "About",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image"
});

const store = useCounterStore();
onServerPrefetch(() => {

  store.increment();
  store.increment();
});
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div style="font-size: 2rem; margin-top: 2rem">
      {{ store.count }}
    </div>
    <button @click="store.increment">+</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
