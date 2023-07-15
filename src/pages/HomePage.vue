<script setup lang="ts">
import { onServerPrefetch } from "vue";
import { RouterView } from "vue-router";
import { useServerSeoMeta } from "unhead";
import { useNewsStore } from "@/stores/news";

useServerSeoMeta({
  title: "Home",
  description: "My Home page",
  ogDescription: "Still Home my Home page",
  ogTitle: "Home",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image"
});

const storeNews = useNewsStore();
onServerPrefetch(async () => {
  await storeNews.fetchNews();
});
storeNews.fetchNews();
</script>

<template>
  <main>
    <div>Home Page</div>
    <div v-if="storeNews.status === 'loading'">Loading . . .</div>
    <div v-else>
      <div v-for="item in storeNews.news" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p>{{ item.brief }}</p>
        <img width="300" :src="item.image.thumbnail" :alt="item.title" srcset="" />
        <br />
        <br />
      </div>
    </div>
  </main>
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
