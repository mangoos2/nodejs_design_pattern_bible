import { Writable } from "stream";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mkdirp from "mkdirp-promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ToFileStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true });
  }

  // cb 작업이 완료될 때 호출, 필요한 경우 stream 에서 발생한 error 객체 전달할 때 사용 등
  _write(chunk, encoding, cb) {
    mkdirp(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb);
  }
}

const tfs = new ToFileStream();

tfs.write({
  path: join(__dirname, "downloaded", "file1.txt"), content: "hello"
});
tfs.write({
  path: join(__dirname, "downloaded", "file2.txt"), content: "node.js"
});
tfs.write({
  path: join(__dirname, "downloaded", "file3.txt"), content: "streams"
});

tfs.end(() => console.log("All files created"));