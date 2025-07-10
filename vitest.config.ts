import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    watch: false,
    testTimeout: isCI ? 10000 : 1000,
    hookTimeout: isCI ? 10000 : 1000,
    teardownTimeout: isCI ? 10000 : 1000,
    include: ["test/vitest/**/*.spec.ts"],
    coverage: {
      include: ["src/**/*.ts", "artifacts/dist/loader/*.js"],
    },
  },
});
