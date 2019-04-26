let Image = require('./Image');
let Permission = require('./Permission');
let Post = require('./Post');
let Tag = require('./Tag');
let User = require('./User');
let Artist = require('./Artist');
let Group = require('./Group');
//---------------------------------------------
//用户的头像
User.belongsTo(Image,{foreignKey:'thumb_img'});

//用户权限
User.hasMany(Permission,{
    foreignKey:'permission',
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

//-------------------------------------------

//标签对应的帖子
Tag.hasMany(Post,{
    foreignKey:'tag_post',
    constraints:false
});


//-------------------------------------------
//作者的作品
Artist.hasMany(Post,{
    foreignKey:'article_work',
    constraints:false
});
//作者的擅长
Artist.hasMany(Tag,{
    foreignKey:'article_good',
    constraints:false
});
//-------------------------------------------
Group.hasMany(Post,{
    foreignKey:'group_work',
    constraints:false
});

//----------------------------------------
Post.belongsTo(Image,{foreignKey:'thumb_img'})
//帖子的标签
Post.hasMany(Tag,{
    foreignKey:'post_tag',
    constraints:false
});

//帖子的语言
Post.hasMany(Tag,{
    foreignKey:'language',
    constraints:false
});

//帖子的缩略图
Post.hasMany(Image,{
    foreignKey:'thumb_image',
    constraints:false
});

//帖子的内容
Post.hasMany(Image,{
    foreignKey:'image',
    constraints:false
});

//帖子的作者
Post.hasMany(Artist,{
    foreignKey:'artist',
    constraints:false
});

//帖子的模仿
Post.hasMany(Tag,{
    foreignKey:'parody',
    constraints:false
});

//类别
Post.hasMany(Tag,{
    foreignKey:'category',
    constraints:false
});

//角色
Post.hasMany(Tag,{
    foreignKey:'character',
    constraints:false
});

//女性标签
Post.hasMany(Tag,{
    foreignKey:'female',
    constraints:false
});

//男性标签
Post.hasMany(Tag,{
    foreignKey:'male',
    constraints:false
});


//组织
Post.hasMany(Group,{
    foreignKey:'group',
    constraints:false
});

//混杂
Post.hasMany(Tag,{
    foreignKey:'misc',
    constraints:false
});

module.exports = {
    Image,
    Permission,
    Post,
    Tag,
    User,
    Artist,
    Group
};