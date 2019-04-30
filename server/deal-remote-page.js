let {HEADER, nhsearch, nhentai} = require('../config/config.server');
const HtmlParser = require('../utils/html-parser');
const {Post, Image, Artist, Group, Tag} = require('../model');


let request = require('request');

function get(url, data) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'GET',
            headers: HEADER,
            gzip: true,
            qs: data,
            useQuerystring: true
        }, function (error, response, body) {
            if (error) {
                reject(error)
            } else {
                resolve(body.toString());
            }
        })
    })
}

async function dealNhPage(page_num) {
    try {
        let res_html = await get(nhsearch, {
            q: 'chinese',
            page: page_num
        });
        let res_data = HtmlParser.parseNHentai(res_html)
        return res_data;
    } catch (e) {
        throw e;
    }

}

async function dealNhDetail(post_id) {
    let detail_html = null;
    let res_data = null;
    let post_intro = await Post.findByPk(post_id, {
        attributes: ['remote_url','title'],
        include: [{
            model: Image,
            as: 'thumb',
            attributes: ['path_thumb', 'thumb_url']
        }]
    });
    try {
        let images =  await post_intro.getWorkImages({where:{
                work_image:76
            },attributes: ['thumb_url']});
debugger
    } catch (e) {
        console.log(e)
        // detail_html = await get(post_intro.remote_url);
        // res_data = HtmlParser.parseNhDetail(detail_html);
        // return Object.assign({},res_data,post_intro.dataValues);
    }
}


dealNhDetail(76)
// dealNhPage();

module.exports = {
    dealNhPage,
    dealNhDetail
}