#!/usr/bin/env node

'use strict';
const program = require('commander');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json')

const SetRollupConfigDuplexStream = require('./setRollupConfigDuplexStream.js'); //config文件配置流
const SetIndexHtmlDuplexStream = require('./setIndexHtmlDuplexStream.js'); //index.html文件配置流
const SetPacageJsonDuplexStream = require('./setPacageJsonDuplexStream.js'); //package.json文件配置流

let cwd = process.cwd();
let commandRootPath = path.resolve(__dirname, '..');
let outputRootDir = 'rollup-project';
let inputRootDir = 'templates';

program
    .version(pkg.version)
    .usage('rollup-cli')
    .option('-i, --input [value]', '设置入口文件名称', 'main.js')
    .option('-o, --output [value]', '设置输出文件名称', 'bundle.js')
    .option('-f, --format [value]', '设置输出格式', 'umd')
    .option('-n, --name [value]', '设置输出模块的全局名字', 'main')
    .option('-s, --sourceMap [value]', '设置sourceMap', false)

program
    .command('init <projectName>')
    .description('部署一个服务节点')
    .action(function(projectName) {
        outputRootDir = projectName;
    });

program.parse(process.argv);

const setRollupConfigDuplexStream = new SetRollupConfigDuplexStream(program);
const setIndexHtmlDuplexStream = new SetIndexHtmlDuplexStream(program);
const setPacageJsonDuplexStream = new SetPacageJsonDuplexStream(program);

copyTemplates(path.resolve(__dirname, '..', 'templates'));

function fileCopyFinishLog(writeStream, outputPath) { //copy finish after log

    writeStream.on('end', function() {
        console.log('   \x1b[36mcreate\x1b[0m : ' + path.relative(cwd, outputPath));
    });

}

function copyTemplates(dir) {

    fs.readdir(dir, (err, filesName) => {

        if (err) {
            throw err;
        }

        filesName.forEach((fileName) => {

            let inputPath = path.resolve(dir, fileName); //输入文件路径

            if (fs.statSync(inputPath).isDirectory()) { //是文件夹

                copyTemplates(inputPath);

            } else {

                let outFileName = fileName;

                if (outFileName == 'main.js') outFileName = program.input; //设置rollup 打包入口文件名称

                let reg = new RegExp(inputRootDir);
                let relativePath = path.relative(commandRootPath, dir); //相对根目录路径

                let outputPath = path.resolve(cwd, relativePath, outFileName)
                    .replace(reg, outputRootDir);

                let outputName = path.dirname(outputPath);

                if (!fs.existsSync(outputName)) {
                    fs.mkdirSync(outputName);
                }

                let currentCreateReadStream = fs.createReadStream(inputPath);
                let currentCreateWriteStream = fs.createWriteStream(outputPath);

                switch (outFileName) {

                    case 'rollup.config.js':

                        currentCreateReadStream.pipe(setRollupConfigDuplexStream).pipe(currentCreateWriteStream);

                        break;

                    case 'index.html':

                        currentCreateReadStream.pipe(setIndexHtmlDuplexStream).pipe(currentCreateWriteStream);

                        break;

                    case 'package.json':

                        currentCreateReadStream.pipe(setPacageJsonDuplexStream).pipe(currentCreateWriteStream);

                        break;

                    default:
                        currentCreateReadStream.pipe(currentCreateWriteStream);
                }

                fileCopyFinishLog(currentCreateReadStream, outputPath); //copy finish after log

            }

        })

    })

}