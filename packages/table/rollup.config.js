import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import scss from "rollup-plugin-scss";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./index.ts",
  output: { dir: "lib", format: "cjs" },
  plugins: [
    resolve(),
    commonjs(),
    uglify(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "lib",
    }),
    scss({
      output: "table.css",
    }),
  ],
  external: ["react", "react-dom", "react-table"],
};
