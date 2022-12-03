import { Transform } from "stream";

const searchStr = "World";
const replaceStr = "Node.js";
let tail = "";

const replaceStream = new Transform({
  defaultEncoding: "utf8",
  transform(chunk, encoding, cb) {
    console.log("chunk1: %s", chunk.toString());
    const pieces = (tail + chunk).split(searchStr);
    const lastPiece = pieces[pieces.length - 1];
    const tailLen = searchStr.length - 1;

    tail = lastPiece.slice(-tailLen);
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);
    this.push(pieces.join(replaceStr));
    cb();
  },

  flush(cb) {
    this.push(tail);
    cb();
  }
});

replaceStream.on("data", chunk => console.log("chunk:%s", chunk.toString()));
replaceStream.on("end", ()=> console.log("end"));

replaceStream.write("Hello");
replaceStream.write("W");
replaceStream.write("W");
replaceStream.write("W");
replaceStream.write("World");

replaceStream.end();