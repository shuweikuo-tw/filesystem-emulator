/// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // Ensure relative paths for assets in production
  plugins: [react()],
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