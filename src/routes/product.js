const express = require('express');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');
const { createServer } = require('mysql2');
const { createProductForSupplier,getProductsBySupplier, deleteProductBySupplier} = require('../controllers/product.controller');
const { route } = require('./product');

const router = express.Router();

router.get('/suppliers/:id/products', authMiddleware, roleMiddleware(['admin'],['user']), getProductsBySupplier);
router.post('/suppliers/:id/products', authMiddleware, roleMiddleware(['admin']), createProductForSupplier);
router.put('/suppliers/:id/products', authMiddleware, roleMiddleware(['admin']), createProductForSupplier);
router.delete('/suppliers/:id/products/:id', authMiddleware, roleMiddleware(['admin']), deleteProductBySupplier);

module.exports = router;