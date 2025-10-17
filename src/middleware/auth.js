const { verifyToken } = require("../utils/jwt");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No Authorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Ej: { id: 1, role: 'admin' }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}
module.exports = authMiddleware;