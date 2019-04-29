let Router = require('koa-router');

let router = new Router();
let {dealPage,dealDetail} = require('./controller')

router.get('/post/page/:page_num',dealPage);

router.get('/post/detail/:post_id',dealDetail);
module.exports = router;