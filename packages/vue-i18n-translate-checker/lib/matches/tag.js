const findTranslatesReg = new RegExp(`<\\s*i18n[^>]*>`, 'ig');
const dropCharsReg = new RegExp('\n|\t', 'ig');
const getPhraseReg = new RegExp('\\spath\\=("|\')([^("|\')]*)("|\')', 'ig');

module.exports = function (fileContent) {
  const translatesMatches = fileContent.match(findTranslatesReg);
  if (translatesMatches) {
    return translatesMatches
      .map((item) => {
        const cleanString = item.split(dropCharsReg).join(' ');
        return cleanString.split(getPhraseReg)[2];
      })
      .filter(path => !!path);
  }
  return [];
};
