// flowing mode 또는 resume 모드
// 데이터를 read() 를 사용해서 가져오지 않고 도착하자마자 데이터 리스너로 바로전달
// non-flowing 모드에 비해 데이터 흐름을 제어하는 유연성이 떨어짐

process.stdin
  .on("data", (chunk) => {
    console.log("New data available");
    console.log(
      `Chunk read (${chunk.length} bytes): "${chunk.toString()}"`
    );
  }).on("end", () => console.log("End of stream"));