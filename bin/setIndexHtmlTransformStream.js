let stream = require('stream');
let util = require('util');
let fs = require('fs');
let path = require('path');
let resolve = path.resolve;

util.inherits(SetIndexHtmlTransformStream, stream.Transform);

function SetIndexHtmlTransformStream(program, opt) {
    stream.Transform.call(this, {
        // objectMode: true,
        // allowHalfOpen: false
    });
    this.program = program;
}

SetIndexHtmlTransformStream.prototype._transform = function(chunk, encoding, callback) {

    let {
        output,
        name
    } = this.program;
    // src="./bundle.js"
    //new rollupDemo();
    // console.log('-----');
    // console.log(this._readableState);
    chunk = chunk.toString()
        .replace(/(src\=\"\.\/)(.+?)(\")/, '$1' + output + '$3') //设置rollup.config.js input 入口文件名字
        .replace(/(new\s)(.+?)(\(\))/, '$1' + name + '$3') //设置rollup.config.js input 入口文件名字

    this.push(chunk);

    callback();

}

module.exports = SetIndexHtmlTransformStream