let sequelize = require('../config/config.mysql');
let Sequelize = require('sequelize');
const Image  = require('./Image');
const {
    STRING,
    INTEGER,
    BOOLEAN
} = Sequelize;
let User = sequelize.define('user', {
    id:{
        type:INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: STRING,
        allowNull: false
    },
    password: {
        type:STRING,
        allowNull: false,
        defaultValue:'123456'
    },
    email:{
        type:STRING,
        allowNull: true,
        validate:{
            isEmail(value){
                return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/ig.test(value);
            }
        }
    },
    tel:{
        type:STRING,
        allowNull:true,
        validate: {
            len:[11,11],
            isNumeric: true
        }
    },
    sex:{
        type:INTEGER,
        allowNull:true,
        defaultValue: 0
    },
    isVip:{
        type:BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    integral:{
        type:INTEGER,
        allowNull:false,
        defaultValue:0
    },
    level:{
        type:INTEGER,
        allowNull:false,
        defaultValue:0
    }
});



module.exports = User;