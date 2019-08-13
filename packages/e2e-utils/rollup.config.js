import path from 'path';
import glob from 'fast-glob';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import cljs from 'rollup-plugin-commonjs';
import pkg from './package.json';

const SOURCE_PATH = path.join(__dirname, './src');
const DIST_PATH = path.join(__dirname, './dist');
const INPUT_PATH = path.join(SOURCE_PATH, './*.js').replace(/\\/g, '/');
const STATIC_PATH = path.join(SOURCE_PATH, './static/**').replace(/\\/g, '/');
const IGNORE_PATHS = ['./node_modules/**'];
const { ...external } = pkg.dependencies;

const isProd = process.env.NODE_ENV === 'production';

const commonConfig = {
  external: [...Object.keys(external)],
  plugins: [
    cljs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: IGNORE_PATHS,
      runtimeHelpers: false,
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
        sourcemap: !isProd,
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
        sourcemap: !isProd,
        format: 'umd',
        dir: DIST_PATH,
        name: path.basename(filePath, path.extname(filePath)),
      },
    ],
  })),
];
