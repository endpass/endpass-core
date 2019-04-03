import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import path from 'path';
import find from 'find';

import pkg from './package.json';

function resolveDir(dir) {
  return path.join(__dirname, '', dir);
}

const excludePaths = ['./node_modules/**'];
const sourceDir = resolveDir('./src');

const commonConfig = {
  external: [...Object.keys(pkg.dependencies)],
  plugins: [
    alias({
      '@': sourceDir,
      resolve: ['.js', './src/index.js'],
    }),
    babel({
      exclude: excludePaths,
      runtimeHelpers: true,
    }),
    // commonjs(),
    copy({
      'package.json': 'dist/package.json',
      'README.md': 'dist/README.md',
      'yarn.lock': 'dist/yarn.lock',
    }),
  ],
  watch: {
    exclude: excludePaths,
  },
};

export default [
  {
    ...commonConfig,
    input: find.fileSync(/\.js$/, sourceDir),
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
