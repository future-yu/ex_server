let sequelize = require('../config/config.mysql');
let Sequelize = require('sequelize');
const {
    STRING,
    INTEGER,
} = Sequelize;

let Permission = sequelize.define('Permission',{
    id:{
        type:INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    key:{
        type:INTEGER,
        allowNull:false
    },
    title:{
        type:STRING,
        allowNull:true
    },
    describe:{
        type:STRING,
        allowNull: true
    }
});

module.exports = Permission;
