let {HEADER, nhsearch, nhentai, FNNAME,PROXY_URL} = require('../config/config.server');
const HtmlParser = require('../utils/html-parser');
const {Post, Image, Artist, Group, Tag} = require('../models');
let {Op} = require('sequelize');
let request = require('request');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function get(url, data,headers=null) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'GET',
            headers: headers||HEADER,
            gzip: true,
            qs: data,
            useQuerystring: true,
            // proxy:PROXY_URL
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
        let res_data = HtmlParser.parseNHentai(res_html);
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
        tag_pro.push(post.getWorkImages({attributes: ['thumb_url', 'path_thumb','id']}));
        let allInfos = await Promise.all(tag_pro);
        let allData = post.dataValues;
        allData['hadInfo']=true;
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
            allData['hadInfo']=false;
            detail_html = await get(post.remote_url);
            res_data = HtmlParser.parseNhDetail(detail_html);
            res_data.images = res_data.images.map(item => {
                item.target_url = nhentai + item.target_url;
                return item;
            });
            Object.assign(allData,res_data)
        }
        return allData;
    } catch (e) {
        throw  e;
    }
}

async function getAllFullImg(){
    try {
        let all_target_db = await Image.findAll({
            attributes:['target_url','id'],
            where:{
                target_url:{
                    [Op.not]: null,
                },
                full_url:{
                    [Op.eq]: null,
                }
            }
        });
        let all_target = all_target_db.map(item=>{
            return {
                url:item['dataValues']['target_url'],
                id:item['dataValues']['id']
            }
        });
        let full_pro = all_target.map((item)=>{
            return get(item['url']).then((html)=>{
                let data = HtmlParser.parseNhImage(html);
                return Image.update({
                    full_url:data.url
                },{
                    where: {
                        id:item.id
                    }
                })
            });
        });
        Promise.all(full_pro);
    }catch (e) {

    }
}
getAllFullImg()

// dealNhDetail(1).then(data=>{
//     debugger
// }).catch(err=>{
//     debugger
// })
// dealNhPage();

module.exports = {
    dealNhPage,
    dealNhDetail,
};