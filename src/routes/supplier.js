const express = require('express');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');
const { createServer } = require('mysql2');
const { createSupplier, getSuppliers, updateSupplier, deleteSupplier} = require('../controllers/supplier.controller');

const router = express.Router();

router.get('/suppliers', authMiddleware, roleMiddleware(['admin'],['user']), getSuppliers);
router.post('/suppliers', authMiddleware, roleMiddleware(['admin']), createSupplier);
router.put('/suppliers/:id', authMiddleware, roleMiddleware(['admin']),updateSupplier);
router.delete('/suppliers/:id', authMiddleware, roleMiddleware(['admin']), deleteSupplier);

module.exports = router;