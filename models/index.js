let Image = require('./Image');
let Permission = require('./Permission');
let Post = require('./Post');
let Tag = require('./Tag');
let User = require('./User');
let Artist = require('./Artist');
let Group = require('./Group');

//---------------------------------------------
//用户的头像
User.belongsTo(Image,{constraints:false,as:'avatar'});

//用户权限
User.hasMany(Permission,{
    foreignKey:'permission',
    constraints:false,
    as:'Permissions'
});

//用户收藏
User.hasMany(Post,{
    foreignKey:'favorite',
    constraints:false,
    as:'Favorites'

});

//用户帖子
User.hasMany(Post,{
    foreignKey:'user_post',
    constraints:false,
    as:'UserPosts'
});

//-------------------------------------------

//标签对应的帖子
Tag.hasMany(Post,{
    foreignKey:'tag_post',
    constraints:false,
    as:'TagPosts'
});


//-------------------------------------------
//作者的作品
Artist.hasMany(Post,{
    foreignKey:'artist_work',
    constraints:false,
    as:'ArtistWorks'
});
//作者的擅长
Artist.hasMany(Tag,{
    foreignKey:'artist_strength',
    constraints:false,
    as:'ArtistStrengths'
});
//-------------------------------------------
Group.hasMany(Post,{
    foreignKey:'group_work',
    constraints:false,
    as:'GroupWorks'
});

//----------------------------------------
Post.belongsTo(Image,{constraints:false,as:'thumb'});
//帖子的标签
Post.hasMany(Tag,{
    foreignKey:'post_tag',
    constraints:false,
    as:'PostTags'
});

//帖子的语言
Post.hasMany(Tag,{
    foreignKey:'language',
    constraints:false,
    as:'Languages'
});

//帖子图片
Post.hasMany(Image,{
    foreignKey:'work_image',
    constraints:false,
    as:'WorkImages'
});



//帖子的作者
Post.hasMany(Artist,{
    foreignKey:'artist',
    constraints:false,
    as:'Artists'
});

//帖子的模仿
Post.hasMany(Tag,{
    foreignKey:'parody',
    constraints:false,
    as:'Parodies'
});

//类别
Post.hasMany(Tag,{
    foreignKey:'category',
    constraints:false,
    as:'Categories'
});

//角色
Post.hasMany(Tag,{
    foreignKey:'character',
    constraints:false,
    as:'Characters'
});

//女性标签
Post.hasMany(Tag,{
    foreignKey:'female',
    constraints:false,
    as:'FemaleDes'
});

//男性标签
Post.hasMany(Tag,{
    foreignKey:'male',
    constraints:false,
    as:'MaleDes'
});


//组织
Post.hasMany(Group,{
    foreignKey:'group',
    constraints:false,
    as:'Groups'
});

//混杂
Post.hasMany(Tag,{
    foreignKey:'misc',
    constraints:false,
    as:'Misc'
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