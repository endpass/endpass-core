import path from 'path';
import glob from 'fast-glob';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

const SOURCE_PATH = path.join(__dirname, './src');
const DIST_PATH = path.join(__dirname, './dist');
const INPUT_PATH = path.join(SOURCE_PATH, './*.js');
const IGNORE_PATHS = ['./node_modules/**', './src/worker/**'];

const commonConfig = {
  external: [...Object.keys(pkg.dependencies)],
  plugins: [
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
];
