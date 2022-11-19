// highWaterMark 고려 설계

import { createServer } from "http";
import Chance from "chance";


function generateMore(chanceIns, res) {
  while (chanceIns.bool({ likelihood: 95 })) {
    const randomChunk = chanceIns.string({
      length: (16 * 1024) - 1
    });

    const shouldContinue = res.write(`${randomChunk}\n`);

    if (!shouldContinue) {
      console.log("back-pressure");
      return res.once("drain", () => generateMore(chanceIns, res));  // 임계치가 되면 drain 이벤트가 발생하길 기다린다. 
    }
  }
  res.end("\n\n");
}

const chance = new Chance();
const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" })
  generateMore(chance, res);
  res.on("finish", () => console.log("All data sent"));
});

server.listen(8080, () => {
  console.log("server listening");
})