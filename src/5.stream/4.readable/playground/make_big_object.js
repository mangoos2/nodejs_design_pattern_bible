import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mkdirp from "mkdirp-promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, "json", "big.json");

const bws = createWriteStream(filePath);

mkdirp(dirname(filePath)).then(() => {
    bws.write("{");
    for (let i = 0; i < 500000; i++) {
        bws.write(`"a${i}": ${i},`, "UTF-8");
    }
    bws.write('"a": 1', "UTF-8");
    bws.write("}");
});