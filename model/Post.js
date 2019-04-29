let sequelize = require('../config/config.mysql');
let Sequelize = require('sequelize');
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
    remote_url:{
        type:STRING,
        allowNull: true
    },
    describe:{
        type:STRING,
        allowNull: true
    }
});
module.exports = Post;
