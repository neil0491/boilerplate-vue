<script setup lang="ts">
import { useNewsStore } from "@/stores/news";
import { useRoute } from "vue-router";
import { onServerPrefetch, watch } from "vue";
import Trans from "@/i18n/translation";
import { useLoadingStore } from "@/stores/loading";

const route = useRoute();
const storeNews = useNewsStore();
const loadingStore = useLoadingStore();

onServerPrefetch(async () => {
  await storeNews.fetchDetailNews({ slug: route.params.slug.toString() });
});

storeNews.fetchDetailNews({ slug: route.params.slug.toString() });

watch(
  () => Trans.currentLocale,
  (val) => {
    if (val) {
      storeNews.fetchDetailNews({ slug: route.params.slug.toString() });
    }
  }
);
</script>
<template>
  <div>
    {{ loadingStore.getStatus }}
    <div v-if="loadingStore.getStatus === 'loading'">Loading . . .</div>
    <div v-else-if="loadingStore.getStatus === 'error'">Error page</div>
    <div v-else>
      {{ storeNews.getDetailNews }}
    </div>
  </div>
</template>

<style scoped></style>
