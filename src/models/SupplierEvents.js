// src/models/SupplierEvents.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SupplierEvent = sequelize.define('SupplierEvent', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
});

module.exports = SupplierEvent;