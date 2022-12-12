import { ReplaceStream } from "./replace_stream.js";

process.stdin
  .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
  .pipe(process.stdout)


// pipe 는 오류 이벤트는 전파되지 않는다.
// 아래처럼 pipe 마다  error 이벤트 핸들러를 등록해야함

// stream1
//   .on("error", handleError)
//   .pipe(stream2)
//   .on("error", handleError)

// function handleError(err) {
//   console.log(err);
//   stream1.destroy();
//   stream2.destroy();
// }

//pipeline 을 사용하자

