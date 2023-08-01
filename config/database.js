'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const logger = require('./logger');
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: 0,
    logging: true,
    dialectOptions: {
      options: {
        encrypt: false,
      },
    },
  }
);
(async () => {
  try {
    await sequelize.authenticate();
    logger.log('Connection to Database has been established successfuly');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
})();
module.exports = { sequelize, DataTypes };