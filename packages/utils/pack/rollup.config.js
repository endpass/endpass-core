import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import path from 'path';
import find from 'find';

import pkg from '../package.json';

function resolveDir(dir) {
  return path.join(__dirname, '', dir);
}

const excludePaths = ['../node_modules/**'];
const sourceDir = resolveDir('../src');

const commonConfig = {
  external: [...Object.keys(pkg.dependencies)],
  plugins: [
    alias({
      '@': sourceDir,
      resolve: ['.js', '/index.js'],
    }),
    babel({
      exclude: excludePaths,
      runtimeHelpers: true,
    }),
    // commonjs(),
  ],
  watch: {
    exclude: excludePaths,
  },
};

export default [{
  ...commonConfig,
  input: find.fileSync(/\.js$/, resolveDir('../src')),
  output: [
    {
      exports: 'named',
      format: 'cjs',
      dir: resolveDir('../'),
      entryFileNames: '[name].js',
    },
  ],
}];
