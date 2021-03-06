let {dealNhPage, dealNhDetail} = require('../server/deal-remote-page');
let {getPost, savePostDetail, dbTableCreate} = require('../server/deal-db-save');
const {nhentai, USERNAME, PASSWORD} = require('../config/config.server');
const fs = require('fs');
const path = require('path');

async function dealPage(ctx, next) {
    try {
        let page_data = await dealNhPage(ctx.params.page_num);
        ctx.body = await getPost(page_data);
    } catch (e) {
        console.log(e)
    }

}

async function dealDetail(ctx, next) {
    try {
        let post_id = ctx.params.post_id;
        let data_detail = await dealNhDetail(post_id);
        data_detail.post_id = post_id;
        ctx.body = await savePostDetail(data_detail);
    } catch (e) {
        console.log(e);
    }
}


async function createTables(ctx, next) {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    if (username === USERNAME && password === PASSWORD) {
        if (dbTableCreate()) {
            ctx.body = '创建成功';
        } else {
            ctx.status = 500;
            ctx.body = '创建失败';
        }
    } else {
        ctx.status = 403;
        ctx.body = '用户名或密码错误'
    }
}


async function renderPage(ctx, next) {
    ctx.body = fs.readFileSync(path.join(__dirname, '../public/index.html'))
}

module.exports = {
    dealPage,
    dealDetail,
    createTables,
    renderPage
};