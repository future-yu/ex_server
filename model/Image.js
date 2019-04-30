let sequelize = require('../config/config.mysql');
let Sequelize = require('sequelize');
const {
    STRING,
    INTEGER,
} = Sequelize;

let Image = sequelize.define('Image',{
    id:{
        type:INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    //缩略图本地路径
    path_thumb:{
        type:STRING,
        allowNull:true
    },
    //全图本地路径
    path_full:{
        type:STRING,
        allowNull:true
    },
    //缩略图的网络地址
    thumb_url:{
        type:STRING,
        allowNull:true
    },
    //全图的网络地址
    full_url:{
        type:STRING,
        allowNull:true
    },
    //全图所在网页
    target_url:{
        type:STRING,
        allowNull:true
    },
    describe:{
        type:STRING,
        allowNull: true
    }
});

module.exports = Image;