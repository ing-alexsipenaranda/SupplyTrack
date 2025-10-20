const express  = require('express');
const morgan = require('morgan');
const path = require('path');
const sequelize = require('./config/database');
const User = require('./models/User');
const bcrypt = require('bcrypt');

require('dotenv').config();
const app = express();
app.use(morgan('dev'));

const PORT = process.env.PORT;
app.set('AppName','SupplyTrack');
app.set('port', PORT || 3000);

sequelize.sync({ alter: true }).then(async () => {
  console.log("DB conectada");
  // Usuario demo si no existe
  const user = await User.findOne({ where: { email: "admin@test.com" } });
  if (!user) {
    const hash = await bcrypt.hash("1234", 10);
    await User.create({ email: "admin@test.com", password: hash, role: "admin"});
    console.log("Usuario demo creado: admin@test.com / 1234");
   }
});

app.use(express.json());
const auth = require('./routes/auth');
const supplier = require('./routes/supplier');
const product = require('./routes/product');
const event = require('./routes/event');
const visit = require('./routes/visit');
const industry = require('./routes/industry');
const contact = require('./routes/suppplierContacts');

app.use(auth)
app.use(supplier)
app.use(product)
app.use(industry)
app.use(event)
app.use(visit)
app.use(contact)

app.listen(app.get("port"), "0.0.0.0", () => {
  console.log(`Server ${app.get("AppName")} running on port ${app.get("port")}`)
})