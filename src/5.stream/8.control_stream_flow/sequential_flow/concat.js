import { concatFiles } from "./concat_file.js";


async function main() {
  try {
    await concatFiles(process.argv[2], process.argv.slice(3))
  } catch (err) {
    process.exit(1);
  }
  console.log("All files concatenated successfully");
}

main();

// cli
// node concat.js all.txt file1.txt file2.txt