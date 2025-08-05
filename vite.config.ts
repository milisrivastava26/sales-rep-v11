import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', 
  },
  server: {
    host: "10.8.20.38",
    port: 4047, 
  },
});
