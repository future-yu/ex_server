let Image = require('./Image');
let Permission = require('./Permission');
let Post = require('./Post');
let Tag = require('./Tag');
let User = require('./User');

//---------------------------------------------
//用户的头像
User.hasOne(Image,{foreignKey:'thumb_img'});

//用户权限
User.hasMany(Permission,{
    foreignKey:'permissions',
    constraints:false
});

//用户收藏
User.hasMany(Post,{
    foreignKey:'favorite',
    constraints:false
});

//用户帖子
User.hasMany(Post,{
    foreignKey:'user_post',
    constraints:false
});



//标签对应的帖子
Tag.hasMany(Post,{
    foreignKey:'tag_posts',
    constraints:false
});

//帖子的标签
Post.hasMany(Tag,{
    foreignKey:'tags',
    constraints:false
});

//帖子的语言
Post.hasMany(Tag,{
    foreignKey:'language',
    constraints:false
});

//帖子的缩略图
Post.hasMany(Image,{
    foreignKey:'thumb_images',
    constraints:false
});

//images
Post.hasMany(Image,{
    foreignKey:'images',
    constraints:false
});

//



module.exports = {
    Image,
    Permission,
    Post,
    Tag,
    User
};