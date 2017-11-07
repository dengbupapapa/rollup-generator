let stream = require('stream');
let util = require('util');
let fs = require('fs');
let path = require('path');
let resolve = path.resolve;

util.inherits(SetIndexHtmlDuplexStream, stream.Duplex);

function SetIndexHtmlDuplexStream(program, opt) {
    stream.Duplex.call(this, {
        objectMode: true
    });
    this.program = program
}

SetIndexHtmlDuplexStream.prototype._write = function(chunk, encoding, callback) {

    let {
        output,
        name
    } = this.program;
    // src="./bundle.js"
    //new rollupDemo();
    chunk = chunk.toString()
        .replace(/(src\=\"\.\/)(.+?)(\")/, '$1' + output + '$3') //设置rollup.config.js input 入口文件名字
        .replace(/(new\s)(.+?)(\(\))/, '$1' + name + '$3') //设置rollup.config.js input 入口文件名字

    this.push(chunk);

    callback();

}

SetIndexHtmlDuplexStream.prototype._read = function(size) {

}

module.exports = SetIndexHtmlDuplexStream