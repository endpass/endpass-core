// @ts-nocheck
import path from 'path';
import glob from 'fast-glob';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

function resolveDir(dir) {
  return path.join(__dirname, '', dir);
}

const SOURCE_PATH = path.join(__dirname, './src');
const INPUT_PATH = path.join(SOURCE_PATH, './**/*.js').replace(/\\/g, '/');
const IGNORE_PATHS = ['./node_modules/**'];

const commonConfig = {
  external: [...Object.keys(pkg.dependencies)],
  plugins: [
    alias({
      '@': SOURCE_PATH,
      resolve: ['.js', './src/index.js'],
    }),
    babel({
      exclude: IGNORE_PATHS,
      runtimeHelpers: true,
    }),
    copy({
      targets: [
        {
          src: ['package.json', 'README.md', 'yarn.lock'],
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
        dir: resolveDir('./dist'),
        entryFileNames: '[name].js',
      },
    ],
  },
];
