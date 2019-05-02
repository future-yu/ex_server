let sequelize = require('../config/config.mysql');
let Sequelize = require('sequelize');
const {
    STRING,
    INTEGER,
} = Sequelize;

let Group = sequelize.define('Group',{
    id:{
        type:INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:STRING,
        allowNull:false
    }

});
//thumb_img
module.exports = Group;
