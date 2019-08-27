#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const fastGlob = require("fast-glob");

const reg = new RegExp(`(\\.t|\\$t)\\(['|"][(\\w\\.)]*['|"][\\,|\\)]`, 'ig');

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

const getDeclared = (locale) => {
  const content = require(resolvePath(locale));
  const obj = treeToFlatList(content).reduce((map, key) => {
    map[key] = true;
    return map;
  }, {});
  return obj
};

const matchFiles = async (entries) => {
  let counter = 0;
  const totalEntities = entries.length;
  console.log(`total files: ${totalEntities}`);
  const usedMatches = {};
  return new Promise((resolve, reject) => {
    entries.forEach((entity) => {
      fs.readFile(entity, 'utf8', function(err, content) {
        counter++;
        if (err) {
          reject(err);
          throw err;
        }
        const matches = content.match(reg);
        if (matches) {
          matches.forEach((item) => {
            const key = item.slice(4, -2);
            usedMatches[key] = usedMatches[key] || entity;
          });
        }
        if (counter === totalEntities) {
          resolve(usedMatches);
        }
      });
    });
  });
};

const analyzeNotUsed = (declared, used) => {
  return Object.keys(declared).reduce((notUsed, key) => {
    if (!used.hasOwnProperty(key)) {
      notUsed.push(key);
    }
    return notUsed;
  }, []);
};

const analyzeNotDeclared = (declared, used) => {
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

const logFile = (filesMap) => {
  Object.keys(filesMap).forEach((fileName) => {
    const fields = filesMap[fileName];
    console.log('\x1b[31m%s\x1b[0m', fileName);
    console.log(fields);
  });
};

const analyzeMaps = (locale, usedMap, checkNotUsed) => {
  const declaredMap = getDeclared(locale);
  const notUsed = checkNotUsed ? analyzeNotUsed(declaredMap, usedMap) : [];
  const notDeclaredMap = analyzeNotDeclared(declaredMap, usedMap);
  const isNotDeclared = Object.keys(notDeclaredMap).length !== 0;

  console.log('\x1b[32m%s\x1b[0m', ' analyze of i18n usage');
  if (notUsed.length) {
    console.log('\x1b[33m%s\x1b[0m', `\n not used for [${locale}]`);
    console.log(notUsed);
    console.log(`\ntotal not used: ${notUsed.length}`);
  }
  if (isNotDeclared) {
    console.log('\x1b[31m%s\x1b[0m', '\n\n not declared');
    logFile(notDeclaredMap);
  }
  if (!isNotDeclared && notUsed.length === 0){
    console.log('\x1b[32m%s\x1b[0m', '\n i18n is fine');
  } else {
    process.exit(1);
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
  const res = fastGlob.sync(config.searchPath, { dot: true });
  return res;
};

var cli = {
  async run(files) {
    try {
      const config = getLocales();
      const entries = getEntries(config, files);
      const usedInFiles = await matchFiles(entries);
      const checkNotUsed = !files.length;
      config.locales.forEach((locale) => {
        analyzeMaps(locale, usedInFiles, checkNotUsed);
      })
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
};

cli.run(process.argv.slice(2));
