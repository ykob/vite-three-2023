import glsl from "vite-plugin-glsl";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    glsl({
      include: ["**/*.glsl", "**/*.vs", "**/*.fs"],
      warnDuplicatedImports: true,
      watch: true,
    }),
  ],
});
