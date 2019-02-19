import path from 'path';

import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

function resolveDir(dir) {
  return path.join(__dirname, '', dir);
}

function resolveFile(file) {
  return path.resolve(__dirname, file);
}

const withSourceMaps = (process.env.NODE_ENV !== 'production');

export default {
  input: resolveFile('./src/index.js'),
  external: [...Object.keys(pkg.dependencies), 'websocket', 'ethereumjs-wallet/hdkey'],
  plugins: [
    json(),
    resolve({
      preferBuiltins: false,
    }),
    alias({
      '@': resolveDir('./src'),
      resolve: ['.vue', '.js', '/index.js'],
    }),
    babel({
      exclude: ['node_modules'],
      runtimeHelpers: true,
    }),
    commonjs(),
    !withSourceMaps && terser(),
  ],
  watch: {
    exclude: ['node_modules/**'],
  },
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: withSourceMaps,
  },
};
