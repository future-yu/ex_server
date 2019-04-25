let sequelize = require('../config/config.mysql');
let Sequelize = require('sequelize');
const Image  = require('./Image');
const {
    STRING,
    INTEGER,
} = Sequelize;

let Post = sequelize.define('Post',{
    id:{
        type:INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type:STRING,
        allowNull:false
    },
    thumb_id:{
        type: Sequelize.INTEGER,
        references: {
            model: Image,
            key: 'id',
        },
        defaultValue:1
    },
    describe:{
        type:STRING,
        allowNull: true
    }
});
//thumb_img
module.exports = Post;
