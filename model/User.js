let sequelize = require('sequelize');

sequelize.define('user',{
    username:sequelize.STRING,
    password:sequelize.STRING
});


module.exports = 