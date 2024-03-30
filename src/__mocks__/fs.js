'use strict';

const path = require('path');

const fs = jest.createMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir][path.basename(file)] = newMockFiles[file];
  }
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
  return Object.keys(mockFiles[directoryPath]) || [];
}

function existsSync(file) {
  const dirname = path.dirname(file);
  const fileName = path.basename(file);

  return Object.keys(mockFiles).includes(dirname) && Object.keys(mockFiles[dirname]).includes(fileName);
}

function readFileSync(file, encoding) {
  const dirname = path.dirname(file);
  const fileName = path.basename(file);

  return mockFiles[dirname][fileName];
}

fs.__setMockFiles = __setMockFiles;
fs.existsSync = existsSync;
fs.readdirSync = readdirSync;
fs.readFileSync = readFileSync;

module.exports = fs;