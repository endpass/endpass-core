const analyzeNotUsedPaths = (translatePathMap, translateFileMap) => {
  return Object.keys(translatePathMap).reduce((notUsed, translatePath) => {
    if (!translateFileMap.hasOwnProperty(translatePath)) {
      notUsed.push(translatePath);
    }
    return notUsed;
  }, []);
};

const analyzeNotDeclaredFilesMap = (translatePathMap, translateFileMap) => {
  const filesList = {};
  Object.keys(translateFileMap).reduce((notDeclared, translatePath) => {
    if (!translatePathMap.hasOwnProperty(translatePath)) {
      const fileName = translateFileMap[translatePath];
      filesList[fileName] = filesList[fileName] || [];
      filesList[fileName].push(translatePath);
    }
    return notDeclared;
  }, {});
  return filesList;
};

module.exports = {
  analyzeNotUsedPaths,
  analyzeNotDeclaredFilesMap,
};
