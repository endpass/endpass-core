const childProcess = require('child_process');
const { readdirSync } = require('fs');

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const source = './packages';

getDirectories(source).forEach((folderName) => {
  const path = `${source}/${folderName}`;
  process.chdir(path);
  console.log(`current directory: ${process.cwd()}`);
  childProcess.execSync('yarn', { stdio: 'inherit' });
  process.chdir('../../');
});
