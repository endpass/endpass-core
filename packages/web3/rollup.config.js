import path from 'path';

import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

function resolveDir(dir) {
  return path.join(__dirname, '', dir);
}

function resolveFile(file) {
  return path.resolve(__dirname, file);
}

const withSourceMaps = process.env.NODE_ENV !== 'production';

const inputFiles = pkg.separatedModules
  .concat('index')
  .map(item => resolveFile(`./src/${item}.js`));

export default {
  input: inputFiles,
  external: [
    ...Object.keys(pkg.dependencies),
    'websocket',
    '@endpass/utils/keystoreKeyGen',
    '@endpass/utils/crypto',
    'ethereumjs-wallet/hdkey',
    'eth-lib/lib/hash',
    'eth-lib/lib/account',
  ],
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
    copy({
      targets: [
        {
          src: ['src', 'package.json', 'README.md', 'yarn.lock'],
          dest: 'dist',
        },
        {
          src: 'types/**.d.ts',
          dest: 'dist',
        },
      ],
      verbose: true,
    }),
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
