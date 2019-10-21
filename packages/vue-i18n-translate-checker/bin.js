#!/usr/bin/env node
const fs = require('fs');
const fastGlob = require('fast-glob');

const matchFiles = require('./lib/matchFiles');
const analyze = require('./lib/analyze');
const locales = require('./lib/locales');

const showFiles = (filesMap) => {
  Object.keys(filesMap).forEach((fileName) => {
    const fields = filesMap[fileName];
    console.log('\x1b[31m%s\x1b[0m', fileName);
    console.log(fields);
  });
};

const analyzeLocale = (locale, translateFileMap, checkNotUsed) => {
  const translatePathMap = locales.getFlatMap(locale);
  const notUsedTranslatePaths = checkNotUsed
    ? analyze.analyzeNotUsedPaths(translatePathMap, translateFileMap)
    : [];
  const notDeclaredFilesMap = analyze.analyzeNotDeclaredFilesMap(translatePathMap, translateFileMap);
  const isNotDeclaredFiles = Object.keys(notDeclaredFilesMap).length !== 0;
  const isNotUsedPaths = notUsedTranslatePaths.length !== 0;

  console.log('\x1b[32m%s\x1b[0m', ' analyze of i18n usage');
  if (isNotUsedPaths) {
    console.log('\x1b[33m%s\x1b[0m', `\n not used for [${locale}]`);
    console.log(notUsedTranslatePaths);
    console.log(`\ntotal not used: ${notUsedTranslatePaths.length}`);
  }
  if (isNotDeclaredFiles) {
    console.log('\x1b[31m%s\x1b[0m', '\n\n not declared');
    showFiles(notDeclaredFilesMap);
  }
  if (isNotDeclaredFiles || isNotUsedPaths) {
    process.exit(1);
  } else {
    console.log('\x1b[32m%s\x1b[0m', '\n i18n is fine');
  }
};

const getFilesList = (folderPath, args) => {
  if (args.length) {
    return args;
  }
  const res = fastGlob.sync(folderPath, {dot: true});
  return res;
};

const reader = (entity, cb) => {
  fs.readFile(entity, 'utf8', cb);
};

const cli = {
  async run(files) {
    try {
      const config = locales.getConfig();
      const filesList = getFilesList(config.searchPath, files);
      const translateFileMap = await matchFiles(filesList, reader);
      const checkNotUsed = !files.length;
      config.locales.forEach((locale) => {
        analyzeLocale(locale, translateFileMap, checkNotUsed);
      })
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
};

cli.run(process.argv.slice(2));
