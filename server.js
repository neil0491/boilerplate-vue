import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.VITEST;
const hmrPort = process.env.PORT || 8080;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8") : "";

  const manifest = isProd
    ? JSON.parse(fs.readFileSync(resolve("dist/client/ssr-manifest.json"), "utf-8"))
    : {};

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      base: "/",
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        },
        host: "0.0.0.0",
        port: hmrPort
      },
      appType: "custom"
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      "/",
      (await import("serve-static")).default(resolve("dist/client"), {
        index: false
      })
    );
  }

  app.use(cookieParser());

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      // console.log("Cookies: ", req.cookies[process.env.VITE_COOKIE_LOCALE]);

      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.ts")).render;
      } else {
        template = indexProd;
        // @ts-ignore
        render = (await import("./dist/server/entry-server.js")).render;
      }

      const [appHtml, preloadLinks, headHtml, state] = await render(url, manifest);

      let html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`'<pinia-store>'`, state);

      Object.entries(headHtml).forEach(([key, value]) => {
        html = html.replace(`<!--${key}-->`, value);
      });

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });
  //@ts-ignore
  return { app, vite, hmrPort };
}

if (!isTest) {
  createServer().then(({ app, hmrPort }) => {
    return app.listen(hmrPort, () => {
      console.log(`http://localhost:${hmrPort}`);
    });
  });
}
