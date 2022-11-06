const { spider } = require("./spider1.js");

spider(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.error(err);
  } else if (downloaded) {
    console.log(`Completed the downloaded of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded"`);
  }
});