import { createWriteStream, createReadStream } from "fs";
import { Readable, Transform } from "stream";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function concatFiles(dest, files) {
  return new Promise((resolve, reject) => {
    const destStream = createWriteStream(join(__dirname, dest));

    Readable.from(files)
      .pipe(new Transform({
        objectMode: true,
        transform(filename, enc, done) {
          const src = createReadStream(join(__dirname, filename));
          src.pipe(destStream, { end: false });
          src.on("data", (chunk) => console.log(chunk.toString()));
          src.on("error", done);
          src.on("end", done);
        }
      }))
      .on("error", reject)
      .on("finish", () => {
        destStream.end();
        resolve();
      });
  });
}