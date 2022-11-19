// Readable 스트림은 비동기 반복자(Iterator) 이기도 함

async function main() {
  for await (const chunk of process.stdin) {
    console.log("New data available");
    console.log(
      `Chunk read (${chunk.length} bytes): "${chunk.toString()}"`
    )
  }
  console.log("End of stream");
}

main();