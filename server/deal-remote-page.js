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
        attributes: ['remote_url'],
        include: [{
            model: Image,
            as: 'thumb',
            attributes: ['path', 'remote_url']
        }]
    });
    try {
        let images = await post_intro.getFullImages();

    } catch (e) {
        detail_html = await get(post_intro.remote_url);
        res_data = HtmlParser.parseNhDetail(detail_html);
        let img_pro = res_data.ThumbImages.map((item)=>{
            return get(nhentai+item.img_url);
        });
        let img_detail = HtmlParser.parseNhImage(await Promise.all(img_pro));
        res_data.allImages = img_detail;
        return res_data;
    }
}

// dealNhDetail(1)
// dealNhPage();

module.exports = {
    dealNhPage,
    dealNhDetail
}