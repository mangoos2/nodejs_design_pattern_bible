// Iterables 에서 Readable 스트림을 얻는다. 
// import { createWriteStream } from "fs/promises";
import { Readable } from 'stream';

const mountains = [
  { name: 'Everest', height: 8848 },
  { name: 'K2', height: 8611 },
  { name: 'Kangchenjunga', height: 8586 },
  { name: 'Lhotse', height: 8516 },
  { name: 'Makalu', height: 8481 }
];

const mountainsStream = Readable.from(mountains);

// let i = 0;
// 
// mountainsStream.on('data', (mountain) => {
//   console.log(mountain), i++;
//   console.log(i);
//   console.log(`${mountain.name.padStart(14)}\t${mountain.height}m`)
// });

// 큰 데이터를 Readable.from() 으로 인스턴스화 하면 전체를 버퍼로 만들기 때문에
// 스트림의 메모리 효율성을 누릴 수 없다
// fs.createStream, 제너레이터, iterable 을 Readable.from 과 조합하여 활용하는 것이 좋다
// 아래는 일단 for 문으로 돌려본다. 
// 추후 다양한 예제를 작성해보고, 큰 오브젝트로 효율도 체크해보자

const stream = new Readable({ objectMode: true });

stream._read = (size) => console.log("chunk size: %s", size);

const iterMountains = Object.entries(mountains);

for (let i = 0; i < iterMountains.length; i++) {
  process.nextTick(() => stream.push(iterMountains[i]));
}

let idx = 0;
stream.on("data", (chunk) => {

  console.log("chunk: %o, index: %s", chunk, idx);
  idx++;
});

stream.on("end", () => console.log("end"));