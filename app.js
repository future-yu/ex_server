let Koa = require('koa');
let app  = new Koa();
let allRoutes = require('./routes');
let bodyParser = require('koa-bodyparser');
let cors = require('koa2-cors');
let http = require('http');
let configs = null;

//设置隧道
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

switch (process.env.NODE_ENV) {
    case 'dev':
        configs = require('./config/config.dev');
        break;
    case 'prod':
        configs = require('./config/config.prod');

        break;
    default:

}


//body解析
app.use(bodyParser());

//静态文件
app.use(require('koa-static')(__dirname + '/public'));

//跨域
app.use(cors());

//路由
app.use(allRoutes.routes(),allRoutes.allowedMethods());



let server = http.createServer(app.callback());
//错误出理
server.on('error', function (err) {
    console.error(err)
});

server.on('uncaughtException',function (err) {
    console.error(err)
})

server.listen(configs.PORT,function () {
    console.info(`listen in : ${configs.PORT}`)
});
