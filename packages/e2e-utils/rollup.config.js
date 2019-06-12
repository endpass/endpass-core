import path from 'path';
import glob from 'fast-glob';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import cljs from 'rollup-plugin-commonjs';

import pkg from './package.json';

const SOURCE_PATH = path.join(__dirname, './src');
const DIST_PATH = path.join(__dirname, './dist');
const INPUT_PATH = path.join(SOURCE_PATH, './*.js');
const STATIC_PATH = path.join(SOURCE_PATH, './static/**');
const IGNORE_PATHS = [
  './node_modules/**',
  './src/worker/**',
  './src/static/**',
];
const { nanoid, ...external } = pkg.dependencies;

const commonConfig = {
  external: [...Object.keys(external)],
  plugins: [
    resolve({
      only: ['nanoid'],
    }),
    cljs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: IGNORE_PATHS,
      runtimeHelpers: true,
    }),
    copy({
      targets: {
        'package.json': 'dist/package.json',
        'README.md': 'dist/README.md',
        'yarn.lock': 'dist/yarn.lock',
        ...glob.sync(['./src/worker/*']).reduce(
          (acc, item) =>
            Object.assign(acc, {
              [item]: `dist/${path.basename(item)}`,
            }),
          {},
        ),
      },
    }),
  ],
  watch: {
    exclude: IGNORE_PATHS,
  },
};

export default [
  {
    ...commonConfig,
    input: glob.sync(INPUT_PATH),
    output: [
      {
        exports: 'named',
        format: 'cjs',
        dir: DIST_PATH,
        entryFileNames: '[name].js',
      },
    ],
  },
  ...glob.sync(STATIC_PATH).map(filePath => ({
    input: filePath,
    output: [
      {
        exports: 'named',
        format: 'umd',
        dir: DIST_PATH,
        name: path.basename(filePath),
      },
    ],
  })),
];
