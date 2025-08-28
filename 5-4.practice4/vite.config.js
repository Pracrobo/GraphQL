import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 예시로 포트 번호를 3000으로 변경
  },
  resolve: {
    alias: {
      // use-sync-external-store shim 문제 우회
      "use-sync-external-store/shim/index.js": "react",
    },
  },
  test: {
    globals: true,
    environment: "jsdom", // 전역으로 test, expect 사용 허용
    setupFiles: "./src/setupTests.js", // 또는 .ts
  },
  optimizeDeps: {
    include: ["@apollo/client", "graphql"],
  },
});
