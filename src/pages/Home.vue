<script setup lang="ts">
import { RouterView } from "vue-router";
import Trans from "@/i18n/translation";

</script>

<template>
  <main>
    
    Home Page
  <div>{{ $route.params }}</div>
  </main>
  <router-view />
</template>
