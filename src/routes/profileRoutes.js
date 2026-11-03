const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { validateProfile } = require('../middleware/validation');

router.get('/', profileController.getProfile);
router.post('/', validateProfile, profileController.createProfile);
router.put('/', validateProfile, profileController.updateProfile);
router.delete('/', profileController.deleteProfile);

module.exports = router;