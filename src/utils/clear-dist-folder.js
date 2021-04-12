/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { resolve } = require('path');
const { clearDir } = require('./clear-dir');

const clearDist = () => {
  const distPath = resolve(__dirname, '..', '..', 'dist');

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  clearDir(distPath);
};
clearDist();
