# rollup-generator
#### rollup、generator、quickly build rollup project
## use
#### 1. 全局安装rollup-generator 
	$ npm i rollup-generator -g
#### 2. 到达目标目录
	$ cd xxx
#### 3. 构建项目
	$ rullup-go
#### 4. 进入项目
	$ cd rullup-project(默认地址，也可以通过构建项目的时候设置项目目录名称rullup-go init xxx)
#### 5. 安装依赖
	$ npm i
#### 6. 启动rollup
	$ npm start
## option

	Options:
    	-V, --version            output the version number
    	-i, --input [value]      设置入口文件名称
    	-o, --output [value]     设置输出文件名称
    	-f, --format [value]     设置输出格式
    	-n, --name [value]       设置输出模块的全局名字
    	-s, --sourceMap [value]  设置sourceMap
    	-h, --help               output usage information
    
    Commands:
    	init <projectName>  部署一个服务节点