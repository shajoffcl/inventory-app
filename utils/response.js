module.exports = class Response {
     constructor(code, msg, data) {
          this.code = code;
          this.msg = msg;
          this.data = data;
     }
}