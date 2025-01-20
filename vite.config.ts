import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    API_URL: JSON.stringify(process.env.SUPABASE_URL || ""),
    API_KEY: JSON.stringify(process.env.SUPABASE_KEY || ""),
  },
});
