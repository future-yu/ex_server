let {dealNhPage,dealNhDetail} = require('../server/deal-remote-page');
let {getPost,savePostDetail} = require('../server/deal-db-save');
const {nhentai} = require('../config/config.server');
async function dealPage(ctx,next) {
    try {
        let page_data = await dealNhPage(ctx.params.page_num);
        ctx.body = await getPost(page_data);
    }catch (e) {
        console.log(e)
    }

}
async function dealDetail(ctx,next){
    try {
       let post_id = ctx.params.post_id;
       let data_detail = await dealNhDetail(post_id);
        data_detail.ThumbImages = data_detail.ThumbImages.map(item=>{
            item.img_url = nhentai+item.img_url;
            return item;
        });
        data_detail.post_id = post_id;
        savePostDetail(data_detail);
        ctx.body = data_detail;
    }catch (e) {
        console.log(e);
    }
}


module.exports ={
    dealPage,
    dealDetail
};