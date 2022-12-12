// 스트림을 입력매개변수로받아들이는 API 를 사용해야하는 경우
// 일반적으로는 문제가 될 것이 없지만
// 주어진 API를 호출하고 나서야 스트림을 통해 읽거나 쓰려는 데이터를 사용할수 있게
// 된다면 좀 복잡해질 수 있다


import { createReadStream } from "fs";
import { createBrotliCompress } from "zlib";
import { PassThrough } from "stream";
import { basename } from "path";
// 서드파티 라이브러리에 있는  upload.js 파일이 제공된다고 가정
import { upload } from "./upload.js"; 

// import { createReadStream } from 'fs'
// import { createBrotliCompress } from 'zlib'
// import { PassThrough } from 'stream'
// import { basename } from 'path'
// import { upload } from './upload.js'

const filepath = process.argv[2] // ①
const filename = basename(filepath)
const contentStream = new PassThrough() // ②

upload(`${filename}.br`, contentStream) // ③
  .then((response) => {
    console.log(`Server response: ${response.data}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

createReadStream(filepath) // ④
  .pipe(createBrotliCompress())
  .pipe(contentStream)


// import { createReadStream } from 'fs'
// import { pipeline } from 'stream'
// import { basename } from 'path'
// import { createUploadStream } from './upload.js'

// const filepath = process.argv[2]
// const filename = basename(filepath)

// pipeline(
//   createReadStream(filepath),
//   createUploadStream(filename),
//   (err) => {
//     if (err) {
//       console.error(err)
//       process.exit(1)
//     }

//     console.log('File uploaded')
//   }
// )
