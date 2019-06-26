import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import string from 'rollup-plugin-string';
import vue from 'rollup-plugin-vue';
import sass from 'rollup-plugin-sass';
import path from 'path';
import find from 'find';
import postcss from 'postcss';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

function resolveDir(dir) {
  return path.join(__dirname, '', dir);
}

function resolveFile(file) {
  return path.resolve(__dirname, file);
}

const DIST_DIR = './dist';
const SOURCE_DIR = resolveDir('./src');
const PUBLIC_DIR = resolveDir('./public');

const outputConfig = {
  exports: 'named',
  globals: {
    '@endpass/utils/getOptionParameter': 'getOptionParameter',
  },
};
const excludePaths = ['./node_modules/**'];
const commonConfig = {
  external: [
    ...Object.keys(pkg.dependencies),
    '@endpass/utils/getOptionParameter',
  ],
  plugins: [
    alias({
      '@': SOURCE_DIR,
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
                file: url.replace(/^@/, SOURCE_DIR),
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
            file: url.replace(/^@/, SOURCE_DIR),
          }),
        ],
      },
    }),
    copy({
      targets: [
        {
          src: [
            resolveFile('package.json'),
            resolveFile('README.md'),
            resolveFile('yarn.lock'),
          ],
          dest: DIST_DIR,
        },
        {
          src: [SOURCE_DIR, PUBLIC_DIR],
          dest: DIST_DIR,
        },
        {
          src: [path.join(SOURCE_DIR, './scss/typography/fonts')],
          dest: path.join(DIST_DIR, './kit'),
        },
      ],
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
        file: resolveFile(`${DIST_DIR}/${pkg.module}`),
        format: 'esm',
      },
      {
        ...outputConfig,
        name: pkg.name,
        file: resolveFile(`${DIST_DIR}/${pkg.main}`),
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
        dir: resolveDir(`${DIST_DIR}/components`),
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
        dir: resolveDir(`${DIST_DIR}/kit`),
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
        file: resolveFile(`${DIST_DIR}/kit/kit.theme-default.js`),
      },
    ],
  },
];
