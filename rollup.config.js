import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "./packages/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [
    uglify(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
    scss({
      output: "dist/table.css",
    }),
  ],
  external: ["react", "react-dom"],
};
