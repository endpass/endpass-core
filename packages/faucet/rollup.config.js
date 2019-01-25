import path from 'path';

import pluginResolve from 'rollup-plugin-node-resolve';
import pluginCommonjs from 'rollup-plugin-commonjs';
import pluginAlias from 'rollup-plugin-alias';
import pluginBabel from 'rollup-plugin-babel';
import pluginVue from 'rollup-plugin-vue'

import pkg from './package.json';

function resolveDir(dir) {
  return path.join(__dirname, '', dir);
}

function resolveFile(file) {
  return path.resolve(__dirname, file);
}

const withSourceMaps = (process.env.NODE_ENV !== 'production');

export default {
  input: resolveFile('./src/main.js'),
  external: Object.keys(pkg.dependencies),
  plugins: [
    pluginResolve({
      preferBuiltins: false,
    }),
    pluginAlias({
      '@': resolveDir('./src'),
    }),
    pluginBabel({
      exclude: ['./node_modules'],
      runtimeHelpers: true,
    }),
    pluginCommonjs(),
    pluginVue(),
  ],
  watch: {
    exclude: ['./node_modules/**'],
  },
  output: [
    {
      name: pkg.name,
      file: resolveFile(pkg.module),
      format: 'esm',
      sourcemap: withSourceMaps,
    }, {
      name: pkg.name,
      file: resolveFile(pkg.main),
      globals: {
        'axios': 'axios',
      },
      format: 'umd',
      sourcemap: withSourceMaps,
    }
  ],
};
