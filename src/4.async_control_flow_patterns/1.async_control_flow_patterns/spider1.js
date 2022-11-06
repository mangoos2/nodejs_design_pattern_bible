const fs = require("fs");
const path = require("path");
const superagent = require("superagent");
const mkdirp = require("mkdirp");
const { urlToFilename } = require("../util");

function spider(url, cb) {
  const filename = urlToFilename(url);
  const filePath = path.join(__dirname, "downloaded", filename);

  fs.access(filePath, err => {
    if (err && err.code === "ENOENT") {
      console.log(`Downloading ${url} into ${filename}`);
      superagent.get(url).end((err, res) => {
        if (err) {
          cb(err);
        } else {
          mkdirp(path.dirname(filePath), err => {
            if (err) {
              cb(err);
            } else {
              fs.writeFile(filePath, res.text, err => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, filePath, true);
                }
              })
            }
          })
        }
      })
    } else {
      cb(null, filePath, false);
    }
  })
}

module.exports = {
  spider
}