const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Industry = sequelize.define(
  "Industry",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "industries",
    timestamps: true,
  }
);

module.exports = Industry;