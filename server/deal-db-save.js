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
                        path_thumb: img_path + '_thumb',
                        thumb_url: item.thumb_url,
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
                    attributes: ['path_thumb', 'thumb_url']
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
    let image_db = data_detail['ThumbImages'].map((item, index) => {
        return {
            path_thumb: null,
            thumb_url: item.target_url,
            target_url: item.img_url
        }
    });
    let work_images = await Image.bulkCreate(image_db);
    post.addWorkImages(work_images);
    for (let key in data_detail['tag']) {
        let tag_value = data_detail['tag'][key];
        switch (key) {
            case 'Artists':
                let artists = await Promise.all(tag_value.map(item => {
                    return Artist.findOrCreate({
                        where: {
                            name: item
                        },
                        defaults: {
                            name: item
                        }
                    })
                }));
                post.addArtists(artists);
                artists = artists.map(item=>{
                    return item[0]
                });
                artists.forEach((artist) => {
                    artist.addArtistWorks(post);
                });

                break;
            case 'Groups':
                let groups = await Promise.all(tag_value.map(item => {
                    return Group.findOrCreate({
                        where: {
                            name: item
                        },
                        defaults: {
                            name: item
                        }
                    })
                }));
                groups = groups.map(item=>{
                    return item[0]
                });
                post.addGroups(groups);
                groups.forEach((group) => {
                    group.addGroupWorks(post);
                });
                break;
            default:
                let tags = await Promise.all(tag_value.map(item => {
                    return Tag.findOrCreate({
                        where: {
                            title: item
                        },
                        defaults: {
                            title: item
                        }
                    })
                }));
                tags = tags.map(item=>{
                    return item[0];
                });
                post['add' + key](tags);
                tags.forEach((tag) => {
                    tag.addTagPosts(post)
                })

        }
    }
}

module.exports = {
    savePost,
    getPost,
    savePostDetail
};


