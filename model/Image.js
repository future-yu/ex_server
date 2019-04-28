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
    path:{
        type:STRING,
        allowNull:false
    },
    remote_url:{
        type:STRING,
        allowNull:true
    },
    describe:{
        type:STRING,
        allowNull: true
    }
});

module.exports = Image;
