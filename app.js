let Koa = require('koa');
let app  = new Koa();
let allRoutes = require('./routes');

//静态文件
app.use(require('koa-static')(__dirname + '/public'));

//路由
app.use(allRoutes.routes(),allRoutes.allowedMethods());

app.listen(8080,function () {
    console.log('listen in '+8080)
});