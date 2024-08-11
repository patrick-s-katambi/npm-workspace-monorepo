export const TS_CONFIGBASEJSON = (projectName, package1) => ({
  extends: "@tsconfig/recommended/tsconfig.json",
  compilerOptions: {
    baseUrl: ".",
    paths: {
      [`@${projectName}/${package1}`]: [`packages/${package1}`],
    },
  },
  exclude: ["dist", "build", "node_modules"],
});
