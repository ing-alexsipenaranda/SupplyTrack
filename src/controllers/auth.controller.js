const { generateToken } = require("../utils/jwt");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Simulación de login
// async function login(req, res) {
//   const { email, password } = req.body;

//   // Aquí deberías validar contra DB propia, NO contra Odoo (mejor práctica)
//   if (email === "admin@test.com" && password === "1234") {
//     const token = generateToken({ id: 1, role: "admin" });
//     return res.json({ token });
//   }

//   if (email === "user@test.com" && password === "1234") {
//     const token = generateToken({ id: 2, role: "user" });
//     return res.json({ token });
//   }

//   return res.status(401).json({ error: "Invalid credentials" });
// }

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });


    // ✅ Generar token con el id y el rol desde la DB
    const token = generateToken({ id: user.id, role: user.role });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { login };