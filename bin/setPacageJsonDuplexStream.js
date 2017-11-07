let stream = require('stream');
let util = require('util');
let fs = require('fs');
let path = require('path');
let resolve = path.resolve;

util.inherits(SetPacageJsonDuplexStream, stream.Duplex);

function SetPacageJsonDuplexStream(program, opt) {
    stream.Duplex.call(this, {
        objectMode: true
    });
    this.program = program
}

SetPacageJsonDuplexStream.prototype._write = function(chunk, encoding, callback) {

    let {
        output
    } = this.program;

    chunk = chunk.toString()
        .replace(/(name\"\:\s*\")(.+?)(\"\,)/, '$1' + output.replace('.js', '') + '$3')
        .replace(/(main\"\:\s*\"\.\/source\/)(.+?)(\"\,)/, '$1' + output + '$3');

    this.push(chunk);

    callback();

}

SetPacageJsonDuplexStream.prototype._read = function(size) {

}

module.exports = SetPacageJsonDuplexStream