import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import string from 'rollup-plugin-string';
import vue from 'rollup-plugin-vue';
import sass from 'rollup-plugin-sass';
import path from 'path';
import find from 'find';
import postcss from 'postcss';

import pkg from './package.json';

const DEST_DIR = './dist';

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
  external: [
    ...Object.keys(pkg.dependencies),
    '@endpass/utils/getOptionParameter',
  ],
  plugins: [
    alias({
      '@': sourceDir,
      resolve: ['.vue', '.js', '/index.js', '.svg', '.scss'],
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
    sass({
      output: true,
      processor: css =>
        postcss(require('./postcss.config').plugins) // eslint-disable-line
          .process(css, { from: undefined })
          .then(result => result.css),
      options: {
        outputStyle: 'compressed',
        importer: [
          url => ({
            file: url.replace(/^@/, sourceDir),
          }),
        ],
      },
    }),
  ],
  watch: {
    exclude: excludePaths,
  },
};

export default [
  // old components
  {
    ...commonConfig,
    input: resolveFile('./src/components-legacy.js'),
    output: [
      {
        ...outputConfig,
        file: resolveFile(`${DEST_DIR}/${pkg.module}`),
        format: 'esm',
      },
      {
        ...outputConfig,
        name: pkg.name,
        file: resolveFile(`${DEST_DIR}/${pkg.main}`),
        format: 'umd',
      },
    ],
  },
  {
    ...commonConfig,
    input: find.fileSync(/\.vue$/, resolveDir('./src/components')),
    output: [
      {
        ...outputConfig,
        format: 'cjs',
        dir: resolveDir(`${DEST_DIR}/components`),
        entryFileNames: '[name].js',
      },
    ],
  },

  // new ui-kit
  {
    ...commonConfig,
    input: find.fileSync(/\.vue$/, resolveDir('./src/kit')),
    output: [
      {
        ...outputConfig,
        format: 'cjs',
        dir: resolveDir(`${DEST_DIR}/kit`),
        entryFileNames: '[name].js',
      },
    ],
  },
  {
    ...commonConfig,
    input: resolveFile('./src/kit.theme-default.js'),
    output: [
      {
        ...outputConfig,
        format: 'cjs',
        file: resolveFile(`${DEST_DIR}/kit/kit.theme-default.js`),
      },
    ],
  },
];
