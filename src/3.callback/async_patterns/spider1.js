const fs = require("fs");
const path = require("path");
const superagent = require("superagent");
const mkdirp = require("mkdirp");
const { urlToFilename } = require("./util");

module.exports = function spider(url, cb) {
  const filename = urlToFilename(url);
}
