const Sequelize = require('sequelize');

const mysql_config={
    database: 'ex_phone',
    username:'root',
    password:'123456',
    config_seq:{
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        protocol: 'tcp',
        // disable logging; default: console.log
        logging: true,
        omitNull: true,

        // similar for sync: you can define this to always force sync for models
        // sync: { force: true },

        // pool configuration used to pool database connections
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        },

    }
};


const sequelize = new Sequelize(mysql_config.database, mysql_config.username, mysql_config.password, mysql_config.config_seq);

module.exports = sequelize;