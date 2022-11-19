// non-flowing 모드 또는 pause 모드
// Readable 스트림에서 기본 패턴
// - readable 이벤트에 리스너 연결

process.stdin
  .on("readable", () => {
    let chunk;
    console.log("New data available");
    while ((chunk = process.stdin.read()) !== null) {
      console.log(
        `Chunk read (${chunk.length} bytes): "${chunk.toString()}"`
      );
    }
  }).on("end", () => console.log("End of stream"));