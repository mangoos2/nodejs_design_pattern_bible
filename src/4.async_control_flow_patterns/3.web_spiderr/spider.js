import path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
import { fileURLToPath } from "url";
import superagent from "superagent";
import { urlToFilename, getPageLinks } from "../util.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) return process.nextTick(cb);
  
  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) return process.nextTick(cb);

  function iterate(index) {
    console.log("iterate fired!");
    if (index === links.length) return cb();

    // 재귀적으로 spider 함수를 호출한다. cb 가 2개로 분기됨, 처음 호출한 spider 의 콜백과 다르다, 정신차려야함 ㅠ
    // 에러나면 부모 스택의 cb를 호출
    // 비동기 콜백을 순차적으로 호출할 수 있다.
    spider(links[index], nesting - 1, function(err) {
      if (err) return cb(err); // 부모 스택의 콜백
      iterate(index + 1);
    });
  }
  iterate(0);
}


export function spider(url, nesting, cb) {
  const filename = urlToFilename(url);
  const { dir, serialized } = serializeFilename(filename);

  fs.readFile(serialized, "utf-8", (err, fileContent) => {
    if (err) {
      if (err.code !== "ENOENT") return cb(err);


      return download(url, serialized, (err, requestContent) => {
        if (err) return cb(err);
        spiderLinks(url, requestContent, nesting, cb);
      });
    }

    spiderLinks(url, fileContent, nesting, cb);
  });
}

