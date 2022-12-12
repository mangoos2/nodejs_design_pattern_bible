import { createServer } from 'http'
import { createWriteStream } from 'fs'
import { basename, dirname, join } from 'path'
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url));


const server = createServer((req, res) => {
  //replit 설정이 이상한듯,  서버만 실행하고 호출하지 않았는데 
  // 응답을 한다. 
  // filename  이 undefined 면 그냥 리턴
  if (!req.headers['x-filename']) return;
  const filename = basename(req.headers['x-filename']);
  console.log(filename);
  const destFilename = join(__dirname, 'playground', filename)
  console.log(`File request received: ${filename}`)

  const ws = createWriteStream(destFilename);

  // req 는 스트림객체인가? 확인해야함
  // 아래 문장에서 chunk 1개로 마무리되는듯 한데ㅠ
  // 나중에 pc 에서 더 큰파일로 확인해보자
  // req 가 버퍼인지, 스트림인지 확인 =. req 는 객체인데 음 ㅠ
  // req.on("data", chunk => console.log(chunk.length));

  req
    .pipe(ws)
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' })
      res.end('OK\n')
      console.log(`File saved: ${destFilename}`)
    })
})

server.listen(3000, () => console.log('Listening on http://localhost:3000'))
