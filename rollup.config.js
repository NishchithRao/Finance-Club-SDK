import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
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
      output: "dist/index.css",
      outputStyle: "compressed",
    }),
  ],
  external: ["react", "react-dom", "react-table"],
};
