export const PACKAGE_PACKAGEJSON = {
  version: "0.0.0",
  main: "dist/index.cjs",
  module: "dist/index.mjs",
  exports: {
    ".": {
      types: "./dist/index.d.ts",
      require: "./dist/index.cjs",
      import: "./dist/index.mjs",
    },
  },
  types: "dist/index.d.ts",
  files: ["dist", "README.md", "package.json", "index.ts"],
  scripts: {
    build: "vite build",
  },
  keywords: [],
  license: "ISC",
  description: "Checks whether a number is even",
  publishConfig: {
    access: "public",
  },
};
