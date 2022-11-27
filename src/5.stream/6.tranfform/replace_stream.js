import { Transform } from "stream";

class ReplaceStream extends Transform {
  constructor ( searchStr, replaceStr, options) {
    super({...options});
    this.searchStr = searchStr;
    this.replaceStr = replaceStr;
    this.tail = "";

    // 결과를 확인하기 위애 생성했지만
    // 스트림 객체 안에 결과를 보존하려면 메모리 부담을 검토하자
    // 흘려보내는 것에 집중하는 것이 나을 듯
    this.result = "";
  }

  _transform (chunk, encoding, callback ) {
    const pieces = (this.tail + chunk).split(this.searchStr);
    // console.log("pieces: %o", pieces);
    
    const lastPiece = pieces[pieces.length - 1];
    // console.log("lastPiece: %o", lastPiece);
    
    const tailLen = this.searchStr.length - 1;
    // console.log("tailLen: %s", tailLen);

    // 검색할 문자 길이만큼만 뜯어서 다음 청크앞에 붙여준다.
    this.tail = lastPiece.slice(-tailLen);
    // console.log("this.tail: %s", this.tail);
    
    pieces[pieces.length -1] = lastPiece.slice(0, -tailLen);

    this.result += pieces.join(this.replaceStr);
    
    this.push(pieces.join(this.replaceStr));
    callback();
  }

  _flush (callback) {
    this.push(this.tail);
    callback();
  }
}

const replaceStream = new ReplaceStream("WorldMango", "Node.js");
replaceStream.on("data", chunk => console.log(chunk.toString()));
replaceStream.on("end", () => 
  console.log("final result: %s", replaceStream.result)
);

replaceStream.write("Hello W");
replaceStream.write("orld!");
replaceStream.write("WorldMango aaa WorldMango kkcjkdshfkaseufuaskhf");
replaceStream.end();