let stream = require('stream');
let util = require('util');
let fs = require('fs');
let path = require('path');
let resolve = path.resolve;

util.inherits(SetPacageJsonTransformStream, stream.Transform);

function SetPacageJsonTransformStream(program, opt) {
    stream.Transform.call(this);
    this.program = program
}

SetPacageJsonTransformStream.prototype._transform = function(chunk, encoding, callback) {

    let {
        output,
        name
    } = this.program;

    chunk = chunk.toString()
        .replace(/(name\"\:\s*\")(.+?)(\"\,)/, '$1' + name + '$3')
        .replace(/(main\"\:\s*\"\.\/bundle\/)(.+?)(\"\,)/, '$1' + output + '$3')
        .replace(/\$\$placeholder/g, output.replace('.js', ''));

    this.push(chunk);

    callback();

}

module.exports = SetPacageJsonTransformStream