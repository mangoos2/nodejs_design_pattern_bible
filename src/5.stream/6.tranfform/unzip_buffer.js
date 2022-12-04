import { promises as fs } from "fs";
import { unzip } from "zlib";
import { promisify } from "util";

const unzipPromise = promisify(unzip);

const filename = process.argv[2];
const outputName = process.argv[3];

async function main() {
  const data = await fs.readFile(filename);
  const unzippedData = await unzipPromise(data);
  await fs.writeFile(`${outputName}`, unzippedData);
  console.log(`File successfully compressed name: ${filename}`);
}


main();