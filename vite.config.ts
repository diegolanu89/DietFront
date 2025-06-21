import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
//import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  envDir: "./env",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  server: {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  },
});
/**
 * alias: {
		'@images': path.resolve(__dirname, 'src/images'),
	},
 */
