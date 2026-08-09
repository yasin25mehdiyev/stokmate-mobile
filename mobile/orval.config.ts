import { defineConfig } from "orval";

export default defineConfig({
  stokmate: {
    input: {
      target: "./src/shared/api/swagger.json",
    },
    output: {
      mode: "tags-split",
      target: "./src/shared/api/generated/endpoints.ts",
      schemas: "./src/shared/api/generated/models",
      client: "react-query",
      httpClient: "axios",
      clean: true,
      override: {
        mutator: {
          path: "src/app/axios/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
  },
});
