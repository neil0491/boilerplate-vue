<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, reactive, ref, useAttrs } from "vue/";

interface IStateImage {
  observer: null | IntersectionObserver;
  intersected: boolean;
  loaded: boolean;
}

interface IPropsImage {
  src: string;
  srcPlaceholder?: string;
  srcset?: string;
  alt: string;
  intersectionOptions?: IntersectionObserverInit;
  imgContainerClass?: string;
}

const props = withDefaults(defineProps<IPropsImage>(), {
  srcPlaceholder:
    "data:image/webp;base64,UklGRsgDAABXRUJQVlA4WAoAAAAgAAAAVwIAjwEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg2gEAADA2AJ0BKlgCkAE+KRSJQ6GhIRAEABgChLS3cLuwjaAE9gHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOP4AA/v/uHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
});

const emit = defineEmits<{
  (e: "loaded", value: boolean): void;
  (e: "load", value: HTMLImageElement): void;
  (e: "error", value: HTMLImageElement | undefined): void;
  (e: "intersect"): void;
}>();

const root = ref<HTMLImageElement>();
const attrs = useAttrs();
const state = reactive<IStateImage>({
  observer: null,
  intersected: false,
  loaded: false
});
// Computed
const srcImage = computed(() =>
  state.intersected && props.src ? props.src : props.srcPlaceholder
);
const srcsetImage = computed(() => (state.intersected && props.srcset ? props.srcset : false));

// Methods
const load = () => {
  if (root.value && root.value.getAttribute("src") !== props.srcPlaceholder) {
    state.loaded = true;
    emit("load", root.value);
  }
};
const error = () => emit("error", root.value);

// Hooks
onMounted(() => {
  if ("IntersectionObserver" in window) {
    state.observer = new IntersectionObserver((entries) => {
      const image = entries[0];
      if (image.isIntersecting) {
        state.intersected = true;
        state.observer && state.observer.disconnect();
        emit("intersect");
      }
    }, props.intersectionOptions);

    root.value && state.observer.observe(root.value);
  }
});

onBeforeUnmount(() => {
  if ("IntersectionObserver" in window && state.observer) {
    state.observer.disconnect();
  }
});

const Image = () =>
  h("img", {
    ref: root,
    src: srcImage.value,
    alt: props.alt,
    srcset: srcsetImage.value || null, // set to null explicitly if falsy
    ...attrs,
    class: [attrs.class, "v-lazy-image", { "v-lazy-image-loaded": state.loaded }],
    onLoad: load,
    onError: error
  });
</script>

<template>
  <div class="img-container" :class="imgContainerClass ? imgContainerClass : 'aspect-16-9'">
    <Image />
  </div>
</template>

<style scoped>
.aspect-16-9 {
  padding-bottom: 52%;
}
.img-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.v-lazy-image {
  filter: blur(4px);
}
.v-lazy-image-loaded {
  filter: blur(0);
}
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
