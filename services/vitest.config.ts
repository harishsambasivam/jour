import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    includeSource: ["src/*"],
    setupFiles: ["./src/utils/setup-teardown-hooks.ts"],
  },
});
