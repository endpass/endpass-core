import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import VuePlugin from 'rollup-plugin-vue'

import pkg from './package.json';

const path = require('path');

function resolveDir(dir) {
  return path.join(__dirname, '', dir);
}

const keys = Object.keys(pkg.dependencies);
const external = keys.reduce(
  (list, key) => {
    list.push(key);
    return list;
  },
  ['axios', 'vue'],
);

export default {
  input: 'src/main.js',
  external,
  plugins: [
    json(),
    resolve({
      preferBuiltins: false,
    }),
    alias({
      '@': resolveDir('src'),
    }),
    babel({
      exclude: ['node_modules'],
      runtimeHelpers: true,
    }),
    commonjs(),
    VuePlugin(),
  ],
  watch: {
    exclude: ['node_modules/**'],
  },
  output: {
    file: 'dist/endpass-faucet.umd.min.js',
    format: 'esm',
    sourceMaps: true,
  },
};
