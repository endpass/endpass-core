import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import string from 'rollup-plugin-string';
import vue from 'rollup-plugin-vue';
import path from 'path';
import find from 'find';

import pkg from './package.json';

function resolveDir(dir) {
  return path.join(__dirname, '', dir);
}

function resolveFile(file) {
  return path.resolve(__dirname, file);
}

const outputConfig = {
  exports: 'named',
  globals: {
    '@endpass/utils/getOptionParameter': 'getOptionParameter',
  },
};
const excludePaths = ['./node_modules/**'];
const sourceDir = resolveDir('./src');
const commonConfig = {
  external: [...Object.keys(pkg.dependencies), '@endpass/utils/getOptionParameter'],
  plugins: [
    alias({
      '@': sourceDir,
      resolve: ['.vue', '.js', '/index.js', '.svg'],
    }),
    babel({
      exclude: excludePaths,
      runtimeHelpers: true,
    }),
    commonjs(),
    vue({
      style: {
        preprocessOptions: {
          scss: {
            data: '@import "@/scss/variables.scss";',
            importer: [
              url => ({
                file: url.replace(/^@/, sourceDir),
              }),
            ],
          },
        },
      },
    }),
    string({
      include: '**/*.svg',
    }),
  ],
  watch: {
    exclude: excludePaths,
  },
};

export default [{
  ...commonConfig,
  input: resolveFile('./src/main.js'),
  output: [
    {
      ...outputConfig,
      file: resolveFile(pkg.module),
      format: 'esm',
    }, {
      ...outputConfig,
      name: pkg.name,
      file: resolveFile(pkg.main),
      format: 'umd',
    }
  ],
}, {
  ...commonConfig,
  input: find.fileSync(/\.vue$/, resolveDir('./src/components')),
  output: [
    {
      ...outputConfig,
      format: 'esm',
      dir: resolveDir('./dist/components'),
      entryFileNames: '[name].js',
    }
  ],
}];
