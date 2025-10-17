// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // opcional si ya lo hiciste en server.js

const sequelize = new Sequelize(
  
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
  
);

module.exports = sequelize;