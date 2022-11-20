const { log } = console;
import json from "./json/big.json" assert {type: "json"};
import { Readable } from "stream";


const iter = Object.entries(json);

let prevNum = 0;

// log(iter.length);

// for (let i = 0; i < iter.length; i++) {
//   console.log(iter[i]);
//   prevNum += iter[i][1];
//   console.log(prevNum);
// }

// console.log(prevNum);


const rJson = new Readable({
  read(size) {
    for (let i = 0; i < iter.length; i++) {
      console.log("iter: %o", iter[i]);
      if ( i === iter.length - 1) this.push(null);
      else this.push(iter[i]);
    }
  },
  objectMode: true
})


rJson.on("data", (chunk) => {
  console.log("chunk: %o", chunk[1]);
  prevNum += chunk[1];
  console.log(prevNum)
});

rJson.on("end", () => console.log("end: %s", prevNum));