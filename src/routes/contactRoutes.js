const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');

router.post('/', validateContact, contactController.submitContact);
router.get('/', contactController.getContacts);
router.put('/:id/status', contactController.updateContactStatus);
router.delete('/:id', contactController.deleteContact);

module.exports = router;