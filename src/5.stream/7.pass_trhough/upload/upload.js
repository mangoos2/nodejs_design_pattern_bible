import axios from 'axios'

export function upload(filename, contentStream) {
  return axios.post(
    'http://localhost:3000',
    contentStream,
    {
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Filename': filename
      }
    }
  )
}

//  upload()  함수가 Writable 스트림을 반환하게 인터페이스 변경 229 page

// import axios from 'axios'
// import { PassThrough } from 'stream'

// export function createUploadStream (filename) {
//   const connector = new PassThrough()

//   axios
//     .post(
//       'http://localhost:3000',
//       connector,
//       {
//         headers: {
//           'Content-Type': 'application/octet-stream',
//           'X-Filename': filename
//         }
//       }
//     )
//     .catch((err) => {
//       connector.emit(err)
//     })

//   return connector
// }
