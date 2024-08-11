export const ROOT_PACKAGEJSON = {
  version: "0.0.1",
  private: true,
  version: "1.0.0",
  keywords: [],
  author: "",
  license: "ISC",
  description: "",
  devDependencies: {
    "@nx/vite": "^19.5.7",
    "@nx/web": "^19.5.7",
    "@swc-node/register": "^1.10.9",
    "@swc/core": "^1.7.10",
    "@tsconfig/recommended": "^1.0.7",
    "@vitest/ui": "^1.3.1",
    nx: "^19.5.7",
    typescript: "^5.5.4",
    vite: "^5.4.0",
    "vite-plugin-dts": "^4.0.2",
    vitest: "^1.3.1",
  },
  workspaces: ["packages/*"],
};
