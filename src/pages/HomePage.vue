<script setup lang="ts">
import { watch, onServerPrefetch } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useServerSeoMeta } from "unhead";
import { useNewsStore } from "@/stores/news";
import LazyImage from "@/components/LazyImage.vue";
import Trans from "@/i18n/translation";

useServerSeoMeta({
  title: "Home",
  description: "My Home page",
  ogDescription: "Still Home my Home page",
  ogTitle: "Home",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image"
});

const router = useRouter();
const storeNews = useNewsStore();

onServerPrefetch(async () => {
  await storeNews.fetchNews();
  if (storeNews.getStatus === 404) {
    router.push({ name: "NotFound" });
  }
});
storeNews.fetchNews();

watch(
  () => Trans.currentLocale,
  (val) => {
    if (val) {
      storeNews.refreshStore();
      storeNews.fetchNews();
    }
  }
);
</script>

<template>
  <main>
    <div class="title">Home Page</div>
    <div v-if="storeNews.getStatus === 'loading'">Loading . . .</div>
    <div v-else-if="storeNews.getStatus === 'error'">Error page</div>
    <div class="wrapper-news" v-else>
      <div class="news-item" v-for="item in storeNews.news" :key="item.id">
        <LazyImage
          imgContainerClass="custome-style"
          :src="item.image.medium"
          :alt="item.title"
          :srcPlaceholder="item.image.thumbnail"
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
