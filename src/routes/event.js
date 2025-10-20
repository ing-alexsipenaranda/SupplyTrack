const express = require('express');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');
const { createServer } = require('mysql2');
const { getEvents, createEvent, updateEvent } = require('../controllers/event.controller');
const router = express.Router();


router.get('/events',authMiddleware,roleMiddleware(['admin'],['user']), getEvents);
router.post('/events',authMiddleware,roleMiddleware(['admin']), createEvent);
router.put('/events/:id',authMiddleware,roleMiddleware(['admin']), updateEvent);

module.exports = router;