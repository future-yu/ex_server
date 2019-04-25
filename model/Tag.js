let sequelize = require('../config/config.mysql');
let Sequelize = require('sequelize');
const {
    STRING,
    INTEGER,
} = Sequelize;

let Tag = sequelize.define('Tag',{
    id:{
        type:INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type:STRING,
        allowNull:false
    },
    describe:{
        type:STRING,
        allowNull: true
    }
});

module.exports = Tag;
