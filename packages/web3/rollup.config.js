import path from 'path';

import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import ts from 'rollup-plugin-typescript';
import pkg from './package.json';
import outputList from './plugins.json';

function resolveDir(dir) {
  return path.join(__dirname, '', dir);
}

function resolveFile(...args) {
  args.splice(0, 0, __dirname);
  return path.resolve(...args);
}

const withSourceMaps = process.env.NODE_ENV !== 'production';

const outputConf = {
  exports: 'named',
  sourcemap: withSourceMaps,
};

const commonConfig = config => ({
  external: [...Object.keys(pkg.dependencies), '@endpass/utils/generators'],
  plugins: [
    resolve({
      preferBuiltins: false,
    }),
    alias({
      '@': resolveDir('./src'),
      resolve: ['.js', '/index.js'],
    }),
    json(),
    ts(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts'],
    }),
    commonjs(),
    !withSourceMaps && terser(),
    config.withCopy &&
      copy({
        targets: [
          {
            src: config.withCopy,
            dest: './dist',
          },
        ],
      }),
    visualizer({
      filename: resolveFile('./reports/', `${config.library}.html`),
    }),
  ],
  watch: {
    exclude: ['node_modules/**'],
  },
});

const createConfig = childConfig => {
  const { input, umd, module } = childConfig;
  return {
    input: resolveFile(input),
    ...commonConfig(childConfig),
    watch: {
      clearScreen: false,
    },
    output: [
      {
        ...outputConf,
        file: resolveFile('dist', umd),
        name: pkg.name,
        format: 'umd',
      },
      {
        ...outputConf,
        file: resolveFile('dist', module),
        format: 'esm',
      },
    ],
  };
};

export default outputList.map(createConfig);
