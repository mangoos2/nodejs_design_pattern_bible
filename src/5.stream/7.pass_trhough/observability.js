// PassThrough 스트림은 관찰이 가능하고 느린파이프 연결과
// 지연스트림을 구현하는 데 유용할 수 있음

import { PassThrough } from "stream";

let bytesWritten = 0;
const monitor = new PassThrough();

monitor.on("data", (chunk) => {
  bytesWritten += chunk.length;
});

monitor.on("finish", () => {
  console.log(`${bytesWritten} bytes written`);
});

monitor.write("Hello");
// 5 bytes written
monitor.end();


//  예
// createReadStream(filename)
// .pipe(createGzip())
// .pipe(monitor)
// .pipe(createWriteStream(`${filename}.gz`))
