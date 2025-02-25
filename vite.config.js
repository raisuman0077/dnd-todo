import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      utils: path.resolve(__dirname, "src/utils"),
      views: path.resolve(__dirname, "src/views"),
      actions: path.resolve(__dirname, "src/actions"),
      reducers: path.resolve(__dirname, "src/reducers"),
      css: path.resolve(__dirname, "src/css"),
    },
  },
});
