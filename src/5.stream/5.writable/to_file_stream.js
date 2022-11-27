import { Writable } from "stream";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mkdirp from "mkdirp-promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function filePath (path, filename) {
  return join(__dirname, path, filename);
}

class ToFileStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true });
  }

  _write(chunk, encoding, cb) {
    mkdirp(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb);
  }
}

const tfs = new ToFileStream();


tfs.write({path: filePath("files", "file1.txt"), content: "hello"});
tfs.write({path: filePath("files", "file2.txt"), content: "Node.js"});
tfs.write({path: filePath("files", "file3.txt"), content: "stream"});

tfs.end(() => console.log("All files created"));