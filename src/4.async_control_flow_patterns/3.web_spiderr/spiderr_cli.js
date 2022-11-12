import { spider } from "./spider.js";

const url = process.argv[2];
const nesting = Number.parseInt(process.argv[3], 10) || 1;


spider(process.argv[2], nesting, (err) => {
  console.log("callback fired!!");
  if (err) {
    console.error(err); // 하나라도 다운로드에 실패하면 바로 터진다. 잘못된 링크가 있는 경우 끝!! 실서버에 쓰면 안되요 !!
    process.exit(1);
  }
  console.log("Download completed");
});