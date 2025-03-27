/// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";
import path from "path";

export default defineConfig({
  base: "./", // Ensure relative paths for assets in production
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "ssl/key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "ssl/cert.pem")),
    },
    host: "localhost",
    port: 3000, // Change as needed
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update the service worker
      injectRegister: "auto", // Ensure service worker registration
      manifest: {
        name: "Web Terminal",
        short_name: "WebTerm",
        description: "A web terminal application for managing directories.",
        start_url: "./",
        display: "standalone",
        background_color: "#121212",
        theme_color: "#121212",
        icons: [
          {
            src: "/icons/filesystem_icon_192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/filesystem_icon_512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
    })
  ],
  build: {
    target: "esnext", // Optimize for modern browsers
    minify: "esbuild", // Use esbuild for faster builds
    sourcemap: false, // Disable sourcemaps for production
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});