<script lang="ts" setup>
import Trans from "@/i18n/translation";
import { useRouter } from "vue-router";

// const { t, locale } = useI18n();

const supportedLocales = Trans.supportedLocales;

const router = useRouter();

const switchLanguage = async (event: any) => {
  const newLocale = event.target.value;
  await Trans.switchLanguage(newLocale);

  try {
    await router.replace({
      params: { locale: newLocale === Trans.defaultLocale ? "" : newLocale }
    });
  } catch (e) {
    router.push("/");
  }
};
</script>
<template>
  <select @change="switchLanguage">
    <option
      v-for="sLocale in supportedLocales"
      :key="`locale-${sLocale}`"
      :value="sLocale"
      :selected="Trans.currentLocale === sLocale"
    >
      {{ $t(`locale.${sLocale}`) }}
    </option>
  </select>
</template>
