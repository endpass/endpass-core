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
const INPUT_PATH = path.join(SOURCE_PATH, './**/*.js');
const IGNORE_PATHS = ['./node_modules/**'];

const commonConfig = {
  external: [...Object.keys(pkg.dependencies)],
  plugins: [
    alias({
      '@': SOURCE_PATH,
      resolve: ['.js', './src/index.js'],
    }),
    babel({
      exclude: IGNORE_PATHS.concat('./src/test/e2eInterceptorWorker.js'),
      runtimeHelpers: true,
    }),
    // commonjs(),
    copy({
      targets: {
        'package.json': 'dist/package.json',
        'README.md': 'dist/README.md',
        'yarn.lock': 'dist/yarn.lock',
        'src/test/e2eInterceptorWorker.js': 'dist/e2eInterceptorWorker.js',
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
    input: glob.sync([INPUT_PATH, '!**/*/e2eInterceptorWorker.js']),
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
