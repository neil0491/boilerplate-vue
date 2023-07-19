<script setup lang="ts">
import { onServerPrefetch } from "vue";
import { RouterView } from "vue-router";
import { useServerSeoMeta } from "unhead";
import { useNewsStore } from "@/stores/news";
import LazyImage from "@/components/LazyImage.vue";

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
    <div class="title">Home Page</div>
    <div v-if="storeNews.status === 'loading'">Loading . . .</div>
    <div class="wrapper-news" v-else>
      <div class="news-item" v-for="item in storeNews.news" :key="item.id">
        <LazyImage
          imgContainerClass="custome-style"
          :src="item.image.medium"
          :alt="item.title"
        ></LazyImage>
        <h3>{{ item.title }}</h3>
        <p>{{ item.brief }}</p>
        <br />
        <br />
      </div>
    </div>
  </main>
  <router-view />
</template>

<style lang="css">
.custome-style {
  padding-bottom: 100%;
}
.square {
  width: 200px;
  height: 100px;
  margin: 0 auto;
  background-color: aquamarine;
}
.title {
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  margin: 1rem 0;
}
.wrapper-news {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 90%;
  margin: 0 auto;
}

img {
  width: 100%;
  height: auto;
}

.news-item {
  flex: 0 0 calc(25% - 1rem);
}
h3 {
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5;
}
p {
  margin-top: 1rem;
}
</style>
