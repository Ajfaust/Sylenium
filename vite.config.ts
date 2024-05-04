import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5703,
    proxy: {
      "/api": {
        target: "https://localhost:7207",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  css: {
    postcss: {},
  },
});
