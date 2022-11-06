const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const superagent = require("superagent");
const { urlToFilename } = require("../util");

const FILE_PREFIX_TO_SAVE = "downloaded";

function serializeFilename(filename, prefix = FILE_PREFIX_TO_SAVE) {
  const base = path.basename(filename);
  return {
    base: path,
    dir: path.dirname(filename),
    serialized: path.join(__dirname, prefix, base)
  }
}

function saveFile(filename, contents, cb) {
  const { dir, serialized } = serializeFilename(filename);

  mkdirp(dir, err => {
    if (err) return cb(err);
    fs.writeFile(serialized, contents, cb);
  });
}

function download(url, filename, cb) {
  console.log(`Downloading ${url}`);
  superagent.get(url).end((err, res) => {
    if (err) return cb(err);
    saveFile(filename, res.text, err => {
      if (err) return cb(err);
      console.log(`Downloaded and saved ${url}`);
      cb(null, res.text);
    });
  });
}

module.exports = {
  spider(url, cb) {
    const filename = urlToFilename(url);
    const { dir, serialized } = serializeFilename(filename);

    fs.access(serialized, err => {
      if (!err || err.code !== "ENOENT") return cb(null, serialized, false);
      download(url, serialized, err => {
        if (err) return cb(err);
        cb(null, serialized, true);
      });
    });
  }
}