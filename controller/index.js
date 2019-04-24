let Router = require('koa-router');
let router = new Router();

router.get('/',async (ctx)=>{
    ctx.body = 'xxx';
});

module.exports = router;