import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";

export default {
  input: "./src/index.tsx",
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModuleRoot: "src",
    sourcemap: true,
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
    json(),
  ],
  external: ["react", "react-dom"],
};
