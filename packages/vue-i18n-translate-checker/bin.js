#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const fastGlob = require('fast-glob');

const matchFiles = require('./matchFiles');

const resolvePath = (...args) => {
  return path.resolve.apply(path, [__dirname, '../../../', ...args]);
};

const treeToFlatList = (tree) => {
  const res = Object.keys(tree).reduce((map, key) => {
    const child = tree[key];
    if (typeof child === 'object') {
      const childList = treeToFlatList(tree[key]);
      map = childList.reduce((prentMap, item) => {
        const node = `${key}.${item}`;
        prentMap.push(node);
        return prentMap;
      }, map)
    } else {
      map.push(key);
    }
    return map;
  }, []);
  return res;
};

const showFiles = (filesMap) => {
  Object.keys(filesMap).forEach((fileName) => {
    const fields = filesMap[fileName];
    console.log('\x1b[31m%s\x1b[0m', fileName);
    console.log(fields);
  });
};

const getLocaleJsonFlatObject = (locale) => {
  const content = require(resolvePath(locale));
  const obj = treeToFlatList(content).reduce((map, key) => {
    map[key] = true;
    return map;
  }, {});
  return obj
};

const analyzeNotUsedKeys = (declared, used) => {
  return Object.keys(declared).reduce((notUsed, key) => {
    if (!used.hasOwnProperty(key)) {
      notUsed.push(key);
    }
    return notUsed;
  }, []);
};

const analyzeNotDeclaredKeys = (declared, used) => {
  const filesList = {};
  Object.keys(used).reduce((notDeclared, key) => {
    if (!declared.hasOwnProperty(key)) {
      const fileName = used[key];
      filesList[fileName] = filesList[fileName] || [];
      filesList[fileName].push(key);
    }
    return notDeclared;
  }, {});
  return filesList;
};

const analyzeLocale = (locale, usedInFilesMap, checkNotUsed) => {
  const jsonFlatObject = getLocaleJsonFlatObject(locale);
  const notUsed = checkNotUsed ? analyzeNotUsedKeys(jsonFlatObject, usedInFilesMap) : [];
  const notDeclaredMap = analyzeNotDeclaredKeys(jsonFlatObject, usedInFilesMap);
  const isNotDeclared = Object.keys(notDeclaredMap).length !== 0;
  const isNotUsed = notUsed.length !== 0;

  console.log('\x1b[32m%s\x1b[0m', ' analyze of i18n usage');
  if (isNotUsed) {
    console.log('\x1b[33m%s\x1b[0m', `\n not used for [${locale}]`);
    console.log(notUsed);
    console.log(`\ntotal not used: ${notUsed.length}`);
  }
  if (isNotDeclared) {
    console.log('\x1b[31m%s\x1b[0m', '\n\n not declared');
    showFiles(notDeclaredMap);
  }
  if (isNotDeclared || isNotUsed) {
    process.exit(1);
  } else {
    console.log('\x1b[32m%s\x1b[0m', '\n i18n is fine');
  }
};

const getLocales = () => {
  const configPath = resolvePath('.vue-i18n-translate-checker.config');
  const config = require(configPath);
  return config;
};

const getEntries = (config, args) => {
  if (args.length) {
    return args;
  }
  const res = fastGlob.sync(config.searchPath, {dot: true});
  return res;
};

const reader = (entity, cb) => {
  fs.readFile(entity, 'utf8', cb);
};

var cli = {
  async run(files) {
    try {
      const config = getLocales();
      const entries = getEntries(config, files);
      const usedInFilesMap = await matchFiles(entries, reader);
      const checkNotUsed = !files.length;
      config.locales.forEach((locale) => {
        analyzeLocale(locale, usedInFilesMap, checkNotUsed);
      })
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
};

cli.run(process.argv.slice(2));
