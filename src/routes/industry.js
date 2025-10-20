const express = require('express');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');
const { createServer } = require('mysql2');
const {getIndustries, createIndustry} = require('../controllers/Industry.controller');

const router = express.Router();

router.get('/industries', authMiddleware, roleMiddleware(['admin'], ['user']), getIndustries);
router.post('/industries', authMiddleware, roleMiddleware(['admin']), createIndustry);

module.exports = router;