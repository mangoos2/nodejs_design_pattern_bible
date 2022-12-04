import { createReadStream, createWriteStream } from "fs";
import { createUnzip } from "zlib";

const filename = process.argv[2];
const outputName = process.argv[3];

createReadStream(filename)
  .pipe(createUnzip())
  .pipe(createWriteStream(`${outputName}`))
  .on("finish", () => console.log(`File successfully compressed`));