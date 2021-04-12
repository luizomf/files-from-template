/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { resolve } = require('path');

const clearDir = (baseDir) => {
  const files = fs.readdirSync(baseDir);

  for (const file of files) {
    const realPath = resolve(baseDir, file);

    if (fs.lstatSync(realPath).isDirectory()) {
      clearDir(realPath);
    } else {
      fs.unlinkSync(realPath);
    }
  }

  const dirs = fs.readdirSync(baseDir);
  for (const dir of dirs) {
    const realPath = resolve(baseDir, dir);
    fs.rmdirSync(realPath);
  }
};

module.exports = { clearDir };
