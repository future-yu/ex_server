let Koa = require('koa');
let app  = new Koa();
let IndexRouter = require('./controller/index');

//静态文件
app.use(require('koa-static')(__dirname + '/public'));

//路由
app.use(IndexRouter.routes(),IndexRouter.allowedMethods());

app.listen(8080);