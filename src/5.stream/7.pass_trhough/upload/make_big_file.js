import { dirname, resolve, join } from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import mkdirp from "mkdirp-promise";

console.log(resolve());
console.log(process.cwd());
console.log(import.meta.url);
console.log(fileURLToPath(import.meta.url));

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log("__dirname: %s", __dirname);

const baseText = "ab";
const fileName = "uploaded_big_file.js"
const filePath = join(__dirname, "playground", fileName);

const ws = createWriteStream(filePath);

mkdirp(dirname(filePath)).then(() => {
  for (let i = 0; i < 1024 * 1024; i++) {
    ws.write(baseText)
  }

})