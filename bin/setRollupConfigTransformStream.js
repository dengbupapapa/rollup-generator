let stream = require('stream');
let util = require('util');
let fs = require('fs');
let path = require('path');
let resolve = path.resolve;

util.inherits(SetRollupConfigTransformStream, stream.Transform);

function SetRollupConfigTransformStream(program, opt) {
    stream.Transform.call(this, {
        objectMode: true
    });
    this.program = program
}

SetRollupConfigTransformStream.prototype._transform = function(chunk, encoding, callback) {

    let {
        input,
        output,
        format,
        name,
        sourceMap,
        rootName
    } = this.program;

    chunk = chunk.toString()
        .replace(/(input\:\s*\'\.\/source\/)(.+?)(\'\,)/, '$1' + input + '$3') //设置rollup.config.js input 入口文件名字
        .replace(/(file\:\s*\'\.\/source\/)(.+?)(\'\,)/, '$1' + output + '$3') //设置rollup.config.js 输出文件名字
        .replace(/(format\:\s*\')(.+?)(\'\,)/, '$1' + format + '$3') //设置rollup.config.js 输出打包格式
        .replace(/(name\:\s*\')(.+?)(\'\,)/, '$1' + name + '$3') //设置rollup.config.js 输出umd格式全局方法名
        .replace(/(sourceMap\:\s*)(.+?)(\,)/, '$1' + sourceMap + '$3') //设置rollup.config.js 是否输出sourcemap

    this.push(chunk);

    callback();

}

module.exports = SetRollupConfigTransformStream