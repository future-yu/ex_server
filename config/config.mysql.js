const Sequelize = require('sequelize');

const mysql_config={
    database: 'ex_phone',
    username:'root',
    password:'123456',
    config_seq:{
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        },

    }
};


const sequelize = new Sequelize(mysql_config.database, mysql_config.username, mysql_config.password, mysql_config.config_seq);

module.exports = sequelize;