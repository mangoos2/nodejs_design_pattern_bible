import { Transform } from "stream";

export class FilterByCountry extends Transform {
  constructor(country, options = {}) {
    options.objectMode = true;
    super(options);
    this.country = country;
  }

  _transform(record, enc, cb) {
    if (record.country === this.country) {
      this.push(record);
    }
    // cb() 를 꼭 호출현재 레코드가 성공적으로처리 되었으며, 
    // stream이 다른레코드를 수신할 준비가 되었음을 나타내어야 함.
    cb();
  }
}