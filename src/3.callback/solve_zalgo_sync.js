const { readFileSync } = require("fs");

const cache = new Map();

function consistentReadSync (filename) {
  if (cache.has(filename)) {
    return cache.get(filename);
  } else {
    const data = readFileSync(filename, "utf-8");
    cache.set(filename, data);
    return data;
  }
}

// zalgo.js의 createFileReader 의 api도 동기로 작동할수 있도록 수정해야 함