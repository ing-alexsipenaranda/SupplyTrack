const sequelize = require("../config/database");
const User = require("./User");
const Supplier = require("./Supplier");
const SupplierEvent = require("./SupplierEvents");
const Event = require("./Event");
const Industry = require("./Industry");
const Product = require("./Product");
const Visit = require("./Visit");

// Relaciones
User.hasMany(Supplier, { foreignKey: "created_by" });
Supplier.belongsTo(User, { foreignKey: "created_by" });

Industry.hasMany(Supplier, { foreignKey: "industryId" });
Supplier.belongsTo(Industry, { foreignKey: "industryId" });

Supplier.belongsToMany(Event, { through: SupplierEvent, foreignKey: "supplierId" });
Event.belongsToMany(Supplier, { through: SupplierEvent, foreignKey: "eventId" });

Supplier.hasMany(Product, { foreignKey: "supplierId" });
Product.belongsTo(Supplier, { foreignKey: "supplierId" });

Supplier.hasMany(Visit, { foreignKey: "supplierId" });
Visit.belongsTo(Supplier, { foreignKey: "supplierId" });

User.hasMany(Visit, { foreignKey: "userId" });
Visit.belongsTo(User, { foreignKey: "userId" });

Event.hasMany(Visit, { foreignKey: "eventId" });
Visit.belongsTo(Event, { foreignKey: "eventId" });

module.exports = {
  sequelize,
  User,
  Supplier,
  SupplierEvent,
  Event,
  Industry,
  Product,
  Visit,
};