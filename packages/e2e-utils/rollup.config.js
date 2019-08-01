import path from 'path';
import glob from 'fast-glob';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import cljs from 'rollup-plugin-commonjs';

import pkg from './package.json';

const SOURCE_PATH = path.join(__dirname, './src');
const DIST_PATH = path.join(__dirname, './dist');
const INPUT_PATH = path.join(SOURCE_PATH, './*.js').replace(/\\/g, '/');
const STATIC_PATH = path.join(SOURCE_PATH, './static/**').replace(/\\/g, '/');
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
      targets: [
        {
          src: [
            'package.json',
            'README.md',
            'yarn.lock',
            ...glob
              .sync(['./src/worker/*'])
              .reduce((acc, item) => acc.concat(item), []),
          ],
          dest: 'dist',
        },
      ],
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
        esModule: false,
        exports: 'auto',
        format: 'umd',
        dir: DIST_PATH,
        name: path.basename(filePath, path.extname(filePath)),
      },
    ],
  })),
];
