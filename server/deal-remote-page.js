let {HEADER, nhsearch, nhentai, FNNAME} = require('../config/config.server');
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
    let post = await Post.findByPk(post_id, {
        attributes: ['remote_url', 'title', 'id'],
        include: [{
            model: Image,
            as: 'thumb',
            attributes: ['path_thumb', 'thumb_url']
        }]
    });
    try {
        let tag_pro = FNNAME.map(item => {
            return post['get' + item]()
        });
        tag_pro.push(post.getWorkImages({attributes: ['thumb_url', 'path_thumb']}));
        let allInfos = await Promise.all(tag_pro);
        let allData = post.dataValues;
        allData['tag'] = {};
        FNNAME.forEach((item, index) => {
            if (allInfos[index].length > 0) {
                allData['tag'][item] = allInfos[index].map(item=>{
                    return item['dataValues']['title']||item['dataValues']['name']
                })

            }
        });
        allData['images']=allInfos[FNNAME.length].map(item=>{
            return item['dataValues']
        });
        if(allData['images'].length==0){
            detail_html = await get(post.remote_url);
            res_data = HtmlParser.parseNhDetail(detail_html);
            Object.assign(allData,res_data)
        }
        return allData;
    } catch (e) {

    }
}


// dealNhDetail(1)
// dealNhPage();

module.exports = {
    dealNhPage,
    dealNhDetail
}