let Koa = require('koa');
let app  = new Koa();
let IndexRouter = require('./controller/index');


app.use(IndexRouter.routes(),IndexRouter.allowedMethods());

app.listen(8080);