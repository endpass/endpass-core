const tMatch = require('./matches/t');
const tagMatch = require('./matches/tag');

const matchers = [tMatch, tagMatch];

const matchFiles = async (filesList, fileReader) => {
  let counter = 0;
  const totalFiles = filesList.length;
  console.log(`total files: ${totalFiles}`);

  const translateFileMap = {};
  return new Promise((resolve, reject) => {
    filesList.forEach((filePath) => {
      fileReader(filePath, (err, fileContent) => {
        counter++;
        if (err) {
          reject(err);
          throw err;
        }

        const translateMatches = matchers.reduce((matchesList, matcher) => {
          const matches = matcher(fileContent);
          return matchesList.concat(matches);
        }, []);

        translateMatches.forEach((translatePath) => {
          translateFileMap[translatePath] = translateFileMap[translatePath] || filePath;
        });

        if (counter === totalFiles) {
          resolve(translateFileMap);
        }
      });
    });
  });
};

module.exports = matchFiles;
