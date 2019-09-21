const findTranslatesReg = new RegExp(`(\\.t|\\$t)\\((\\s*)['|"][(\\w\\.)]*['|"][\\,|(\\s*)\\)]`, 'ig');
const dropCharsReg = new RegExp('\n|\t|\\s', 'ig');
const getPhraseReg = new RegExp('[\'|"](.*)[\'|"]', 'ig');

const matchFiles = async (filesList, fileReader) => {
  let counter = 0;
  const totalFiles = filesList.length;
  console.log(`total files: ${totalFiles}`);
  const usedMatches = {};
  return new Promise((resolve, reject) => {
    filesList.forEach((filePath) => {
      fileReader(filePath, (err, content) => {
        counter++;
        if (err) {
          reject(err);
          throw err;
        }
        const matches = content.match(findTranslatesReg);
        if (matches) {
          matches.forEach((item) => {
            const cleanString = item.split(dropCharsReg).join('');
            const key = cleanString.split(getPhraseReg)[1];
            usedMatches[key] = usedMatches[key] || filePath;
          });
        }
        if (counter === totalFiles) {
          resolve(usedMatches);
        }
      });
    });
  });
};

module.exports = matchFiles;
