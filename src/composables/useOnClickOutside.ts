import { onMounted, type Ref } from "vue";
import { useEventListener } from "./useEventListener";

/* how use  
    onClickOutside(containerRef, () => {
    isOpen.value = false;
    });
*/

export function useOnClickOutside(rootEl: Ref<HTMLElement | null>, callback: () => any) {
  // `mousedown` or `mouseup` is better than `click` here because it doesn't bubble up like `click`
  // if you've used `click` here, the callback will be run immediatly.

  if (typeof document !== "undefined") {
    useEventListener(document, "mouseup", (e: Event) => {
      const clickedEl = e.target as HTMLElement;
      // skip if the root element contains the clicked element
      if (rootEl.value?.contains(clickedEl)) {
        return;
      }
      // otherwise execute the action
      callback();
    });
  }
}
