const path = require('path');

const resolvePath = (...args) => {
  return path.resolve.apply(path, [__dirname, '../../../../', ...args]);
};

const treeToFlatList = (tree) => {
  const res = Object.keys(tree).reduce((map, key) => {
    const child = tree[key];
    if (typeof child === 'object') {
      const childList = treeToFlatList(tree[key]);
      return childList.reduce((parentMap, item) => {
        const node = `${key}.${item}`;
        parentMap.push(node);
        return parentMap;
      }, map)
    }
    map.push(key);
    return map;
  }, []);
  return res;
};

const getFlatMap = (locale) => {
  const content = require(resolvePath(locale));
  const obj = treeToFlatList(content).reduce((map, key) => {
    map[key] = true;
    return map;
  }, {});
  return obj
};

const getConfig = () => {
  const configPath = resolvePath('.vue-i18n-translate-checker.config');
  const config = require(configPath);
  return config;
};

module.exports = {
  getFlatMap,
  getConfig,
};
