import { createServer } from "http";
import Chance from "chance";

// res 객체는 Writable stream객체이다. 
const chance = new Chance();
const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" })
  while (chance.bool({ likelihood: 95 })) {
    res.write(`${chance.string()}\n`);
  }
  res.end("\n\n");
  res.on("finish", () => console.log("All data sent"));
});

server.listen(8080, () => {
  console.log("server listening");
})