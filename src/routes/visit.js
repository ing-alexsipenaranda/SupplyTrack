const express = require('express');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');
const { createServer } = require('mysql2');
const { getVisitToSupplier, createVisitToSupplier } = require('../controllers/visit.controller');

const router = express.Router();

router.get('/suppliers/:id/visits', authMiddleware, roleMiddleware(['admin'], ['user']), getVisitToSupplier);
router.post('/suppliers/:id/visits', authMiddleware, roleMiddleware(['admin']), createVisitToSupplier);

module.exports = router;