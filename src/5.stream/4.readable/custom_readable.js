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

let i = 0;

mountainsStream.on('data', (mountain) => {
  console.log(mountain), i++;
  console.log(i);
  console.log(`${mountain.name.padStart(14)}\t${mountain.height}m`)
});