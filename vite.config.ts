import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import UnheadVite from "@unhead/addons/vite";


// const virtualFile = "@virtual-file";
// const virtualId = "\0" + virtualFile;
// const nestedVirtualFile = "@nested-virtual-file";
// const nestedVirtualId = "\0" + nestedVirtualFile;

const base = "/";

// preserve this to test loading __filename & __dirname in ESM as Vite polyfills them.
// if Vite incorrectly load this file, node.js would error out.
//@ts-expect-error
globalThis.__vite_test_filename = __filename;
//@ts-expect-error
globalThis.__vite_test_dirname = __dirname;
export default defineConfig(({ command, ssrBuild }) => ({
  base,
  plugins: [
    vuePlugin(),
    UnheadVite(),
    {
      name: "virtual",
      resolveId(id) {
        if (id === "@foo") {
          return id;
        }
      },
      load(id, options) {
        const ssrFromOptions = options?.ssr ?? false;
        if (id === "@foo") {
          // Force a mismatch error if ssrBuild is different from ssrFromOptions
          return `export default { msg: '${
            command === "build" && !!ssrBuild !== ssrFromOptions
              ? "defineConfig ssrBuild !== ssr from load options"
              : "hi"
          }' }`;
        }
      }
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      vue: process.env.VITE_NODE_ENV === "production" ? "vue" : "vue/dist/vue.esm-bundler.js"
    }
  },
  experimental: {
    renderBuiltUrl(filename, { hostType, type, ssr }) {
      if (ssr && type === "asset" && hostType === "js") {
        return {
          runtime: `__ssr_vue_processAssetPath(${JSON.stringify(filename)})`
        };
      }
    }
  },
  build: {
    minify: false
  },
  ssr: {
    
  },
  optimizeDeps: {}
}));
