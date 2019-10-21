const findTranslatesReg = new RegExp(`(\\.t|\\$t)\\((\\s*)['|"][(\\w\\.)]*['|"][\\,|(\\s*)\\)]`, 'ig');
const dropCharsReg = new RegExp('\n|\t|\\s', 'ig');
const getPhraseReg = new RegExp('[\'|"](.*)[\'|"]', 'ig');

module.exports = function (fileContent) {
  const translatesMatches = fileContent.match(findTranslatesReg);
  if (translatesMatches) {
    return translatesMatches
      .map((item) => {
        const cleanString = item.split(dropCharsReg).join('');
        return cleanString.split(getPhraseReg)[1];
      })
      .filter(path => !!path);
  }
  return [];
};
