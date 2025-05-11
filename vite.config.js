import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "framer-motion",
            "react-router-dom",
            "@heroui/react",
            "@iconify/react",
            "lucide-react",
            "three",
          ],
        },
      },
    },
  },
});
