let {Image,Permission,Post,Tag,User,Artist,Group} = require('../models');

//
//
// Image.sync({force:false});
// Permission.sync({force:false});
// Tag.sync({force:false});
//
// Group.sync({force:false});
// Artist.sync({force:false});
// Post.sync({force:false});
// User.sync({force:false});
//
// Image.create({
//     path:'/images/test.jpg',
//     describe:'美女图片'
// });

// Permission.create({
//     key:0,
//     title:'查看图片',
//     describe:"查看图片的权限"
// });
//
// Tag.create({
//     title: '美女',
//     describe: '美女'
// });

// Image.findByPk(1).then(data=>{
//     User.create({
//         username:'unknown',
//         thumb_id:1
//     });
// })

// Post.create({
//     title:'xxxx',
//     describe:'xxxxascc',
//     thumb_id:1
// })

// Permission.findByPk(2).then((data)=>{
//     User.findByPk(4).then(user=>{
//         user.getPermissions().then((res)=>{
//             debugger
//         })
//     });
// });
