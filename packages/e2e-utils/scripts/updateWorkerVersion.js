#!/usr/bin/env node
/* eslint-disable */

const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const ejs = require('ejs');
const pkg = require('../package.json');

const DIST_PATH = path.resolve(__dirname, '../dist');
const WORKER_PATH = path.join(DIST_PATH, './httpInterceptorWorker.js');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async () => {
  const workerFile = await readFile(WORKER_PATH, 'utf8');
  const updatedWokerContent = ejs.render(workerFile, {
    PACKAGE_VERSION: pkg.version,
  });

  await writeFile(WORKER_PATH, updatedWokerContent, 'utf8');
})();
