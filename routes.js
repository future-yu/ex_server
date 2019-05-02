let Router = require('koa-router');

let router = new Router();
let {dealPage,dealDetail,createTables,renderPage} = require('./controller');

router.post('/project/table',createTables);

router.get('/post/page/:page_num',dealPage);

router.get('/post/detail/:post_id',dealDetail);

router.get('/',renderPage);


module.exports = router;