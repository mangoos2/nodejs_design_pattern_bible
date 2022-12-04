import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { FilterByCountry } from "./filter_by_country.js";
import { SumProfit } from "./sum_profit.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const csvParser = parse({ columns: true });

createReadStream(join(__dirname, "data.csv"))
  .pipe(csvParser)
  .pipe(new FilterByCountry("Italy"))
  .pipe(new SumProfit())
  .pipe(process.stdout)