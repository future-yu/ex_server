const {Post, Tag, Artist, Group, Image} = require('../model');
let {getDigest} = require('../utils/crypto_md5');
const fs = require('fs');
const request = require('request');
const path = require('path');
let {createDir} = require('../utils/file_action');

async function savePost(data) {
    let deal_all = [];
    data.forEach((item) => {
        deal_all.push(new Promise(async (resolve, reject) => {
            try {
                let path_all = getDigest(item.title);
                let img_path = `/works/${path_all.slice(0, 8)}/${path_all.slice(8, 16)}/${path_all.slice(16)}`;
                let thumb_path = path.join(__dirname, '../public', img_path + '_thumb');
                createDir(thumb_path);
                await request.get(item.thumb_url).pipe(fs.createWriteStream(thumb_path));
                let post_new = await Post.create({
                    title: item.title,
                    remote_url: item.href,
                    describe: item.title,
                    thumb: {
                        path: img_path + '_thumb',
                        remote_url: item.thumb_url,
                        describe: item.title
                    }
                }, {
                    include: [{
                        model: Image,
                        as: 'thumb'
                    }]
                });
                resolve({
                    img_url: [img_path + '_thumb', item.thumb_url],
                    img_title: item.title,
                    post_id: post_new.dataValues['id']
                })
            } catch (e) {
                reject(e)
            }
        }))
    });

    return await Promise.all(deal_all);

}

async function getPost(data) {
    let find_all = [];
    data.forEach((item) => {
        find_all.push(Post.findOne({
                where: {
                    remote_url: item.href
                },
                attributes: ['id', 'title'],
                include: [{
                    model: Image,
                    as: 'thumb',
                    attributes: ['path', 'remote_url']
                }]
            })
        )
    });
    let db_res = await Promise.all(find_all);
    let no_res = [];
    let res = [];
    db_res.forEach((item, index) => {
        if (!item) {
            no_res.push(data[index])
        } else {
            let dataValues = item['dataValues'];
            res.push({
                img_url: [dataValues['Image']['dataValues']['path'], dataValues['Image']['dataValues']['remote_url']],
                img_title: dataValues['title'],
                post_info: dataValues['id']
            })
        }
    });
    if (no_res.length > 0) {
        res = res.concat(await savePost(no_res));
    }

    return res;

}

async function savePostDetail(data_detail) {
    let post = await Post.findByPk(data_detail.post_id);

    let artist_pro = [];
    let group_pro = [];
    let img_pro = data_detail['allImages'].map(item=>{
       return Image.create({
           path:null,
           remote_url:item===undefined?null:item
       })
    });
    let thumb_pro = data_detail['ThumbImages'].map(item=>{
        return Image.create({
            path:null,
            remote_url:item.img_url,
            target_url:item.target_url
        })
    });
    for (let key in data_detail['tag']){

    }
    switch (data_detail) {

    }
    debugger
}

module.exports = {
    savePost,
    getPost,
    savePostDetail
};


