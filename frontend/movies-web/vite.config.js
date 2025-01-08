import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests to `/api` to the backend server
      "/api/": {
        target: "http://127.0.0.1:8000/", // Replace with your backend URL
        changeOrigin: true, // Ensure the origin is correctly passed
        secure: false,
      },
      // You can also add more specific proxies if needed
      "/user/": {
        target: "http://127.0.0.1:8000/", // Replace with your backend URL
        changeOrigin: true, // Ensure the origin is correctly passed
        secure: false,
      },

      "/images": {
        target: "http://127.0.0.1:8000/", // Replace with your backend URL
        changeOrigin: true, // Ensure the origin is correctly passed
        secure: false,
      },
    },
  },
});
