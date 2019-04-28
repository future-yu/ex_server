let Router = require('koa-router');

let router = new Router();
let {dealPage} = require('./controller')

router.get('/post/page/:page_num',dealPage);


module.exports = router;