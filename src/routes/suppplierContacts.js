const express = require('express');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');
const {createContact, getContactsBySupplier} = require('../controllers/contact.controller');

const router = express.Router();

router.get('/suppliers/:supplierId/contacts', authMiddleware, roleMiddleware(['admin'],['user']), getContactsBySupplier);
router.post('/suppliers/:id/contacts', authMiddleware, roleMiddleware(['admin']), createContact);

module.exports = router;