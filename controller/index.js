let {dealNhPage} = require('../server/deal-remote-page');
let {getPost} = require('../server/deal-db-save');
async function dealPage(ctx,next) {
    try {
        let page_data = await dealNhPage(ctx.params.page_num);

        ctx.body = await getPost(page_data);
    }catch (e) {
        console.log(e)
    }

}

module.exports ={
    dealPage
};