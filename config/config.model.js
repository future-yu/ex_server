let sequelize = require('./config.mysql');
let Sequelize = require('sequelize')
const {
    STRING,
    INTEGER,
    DOUBLE
} = Sequelize;
let User = sequelize.define('user', {
    username: {
        id:{

            primaryKey: true
        },
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        unique: true
    },
    password: STRING,

});

User.sync({
    force: true,
});
module.exports = {
    User
};