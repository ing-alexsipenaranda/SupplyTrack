const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Visit = sequelize.define(
  "Visit",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "suppliers",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "events",
        key: "id",
      },
    },
    visit_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    notes: DataTypes.TEXT,
    general_mood: DataTypes.STRING,
  },
  {
    tableName: "visits",
    timestamps: true,
  }
);

module.exports = Visit;