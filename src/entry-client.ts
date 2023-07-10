import { createApp } from "./main";

const { app, router, pinia } = createApp();
//@ts-ignore
if (window.__INITIAL_STATE__) {
  //@ts-ignore
  pinia.state.value = JSON.parse(JSON.stringify(window.__INITIAL_STATE__));
}

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount("#app");

  console.log("hydrated");
});
